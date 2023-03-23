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

  describe('update tag', () => {
    it("should return updated tag's name and id", async () => {
      // given
      const userId = stubTag.user.id;
      const newTagName = 'new tag name';
      const params = {
        userId,
        tagId: stubTag.id,
        tagName: newTagName,
      };
      const shouldBe = { name: newTagName, id: stubTag.id };
      const tagRepoSpy = jest
        .spyOn(tagRepo, 'updateTag')
        .mockResolvedValue(shouldBe);

      // when
      const result = await tagService.updateTag(params);

      // then
      expect(tagRepoSpy).toHaveBeenCalledWith(params);
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
