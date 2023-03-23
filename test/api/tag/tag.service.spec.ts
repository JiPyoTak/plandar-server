import { ConflictException } from '@nestjs/common';

import { TagRepository } from '@/api/tag/tag.repository';
import { TagService } from '@/api/tag/tag.service';
import { STUB_TAG } from 'test/api/tag/stub';
import createTestingModule from 'test/utils/createTestingModule';

describe('TagService', () => {
  const stubTag = Object.assign({}, STUB_TAG);

  let tagRepo: TagRepository;
  let tagService: TagService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [TagService],
    });

    tagRepo = moduleRef.get<TagRepository>(TagRepository);
    tagService = moduleRef.get<TagService>(TagService);
  });

  it('Check defining Modules', () => {
    expect(TagRepository).toBeDefined();
    expect(tagService).toBeDefined();
  });

  describe('fail create tag', () => {
    it('request create tag already existed', async () => {
      // given
      const tagName = stubTag.name;
      const userId = stubTag.user.id;
      const alreadyExistTag = { name: stubTag.name, id: stubTag.id };
      const params = { userId, tagName };
      jest.spyOn(tagRepo, 'findTagByName').mockResolvedValue(alreadyExistTag);

      try {
        // when
        await tagService.createTag(params);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('success create tag', () => {
    it("should return created tag's name and id", async () => {
      // given
      const tagName = stubTag.name;
      const userId = stubTag.user.id;
      const shouldBe = { name: stubTag.name, id: stubTag.id };
      const params = { userId, tagName };
      const tagRepoSpy = jest
        .spyOn(tagRepo, 'createTag')
        .mockResolvedValue(shouldBe);

      // when
      const result = await tagService.createTag(params);

      // then
      expect(tagRepoSpy).toHaveBeenCalledWith(params);
      expect(result).toEqual(shouldBe);
    });
  });

  describe('fail update tag', () => {
    it('change name with the same name', async () => {
      // given
      const userId = stubTag.user.id;
      const tagId = stubTag.id;
      const newTagName = stubTag.name;
      const params = {
        userId,
        tagId,
        tagName: newTagName,
      };

      jest
        .spyOn(tagRepo, 'findTagById')
        .mockResolvedValue({ id: tagId, name: newTagName });

      try {
        // when
        await tagService.updateTag(params);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('fail update tag', () => {
    it('try to change name of not existed tag', async () => {
      // given
      const userId = stubTag.user.id;
      const tagId = stubTag.id;
      const newTagName = 'new tag name';
      const params = {
        userId,
        tagId,
        tagName: newTagName,
      };

      jest.spyOn(tagRepo, 'findTagById').mockResolvedValue(null);

      try {
        // when
        await tagService.updateTag(params);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('success update tag', () => {
    it("should return updated tag's name and id", async () => {
      // given
      const userId = stubTag.user.id;
      const tagId = stubTag.id;
      const newTagName = 'new ' + stubTag.name;
      const params = {
        userId,
        tagId,
        tagName: newTagName,
      };
      const shouldBe = { name: newTagName, id: stubTag.id };
      const tagRepoUpdateTag = jest
        .spyOn(tagRepo, 'updateTag')
        .mockResolvedValue(shouldBe);

      const tagRepoFindByTagId = jest
        .spyOn(tagRepo, 'findTagById')
        .mockResolvedValue({
          id: tagId,
          name: stubTag.name,
        });

      // when
      const result = await tagService.updateTag(params);

      // then
      expect(tagRepoUpdateTag).toHaveBeenCalledWith(params);
      expect(tagRepoFindByTagId).toHaveBeenCalledWith({
        userId,
        tagId,
      });
      expect(result).toEqual(shouldBe);
    });
  });

  describe('delete tag', () => {
    it('if success return true else return false', async () => {
      // given
      const userId = stubTag.user.id;
      const tagId = stubTag.id;
      const params = { userId, tagId };
      const shouldBe = true;
      const tagRepoSpy = jest
        .spyOn(tagRepo, 'deleteTag')
        .mockResolvedValue(shouldBe);

      // when
      const tag = await tagService.deleteTag(params);

      // then
      expect(tagRepoSpy).toHaveBeenCalledWith(params);
      expect(tag).toEqual(shouldBe);
    });
  });
});
