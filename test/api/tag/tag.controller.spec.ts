import { INestApplication } from '@nestjs/common';
import * as testRequest from 'supertest';

import { TagController } from '@/api/tag/tag.controller';
import { TagService } from '@/api/tag/tag.service';
import { MOCK_TAG } from 'test/api/tag/mock';
import createTestingModule from 'test/utils/createTestingModule';

describe('TagController', () => {
  const mockedTag = { ...MOCK_TAG };
  let app: INestApplication;
  let tagService: TagService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [TagController],
    });

    app = moduleRef.createNestApplication();
    await app.init();
    tagService = await app.resolve<TagService>(TagService);
  });

  it('Check defining Modules', () => {
    expect(tagService).toBeDefined();
  });

  describe('POST /tag', () => {
    it('expect success response with created tag', async () => {
      // given
      const tag = { name: mockedTag.name };
      const createdTag = { name: mockedTag.name, id: mockedTag.id };
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockResolvedValue(createdTag);

      // when
      const request = testRequest(app.getHttpServer()).post('/tag').send(tag);

      // then
      return request.expect(201).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith(mockedTag.name);
        expect(res.body).toEqual(createdTag);
      });
    });
  });

  describe('PUT /tag/:tagId', () => {
    it('expect success response with updated tag', async () => {
      // given
      const newTagName = 'new tag name';
      const id = mockedTag.id;
      const tag = { name: newTagName };
      const updatedTag = {
        name: newTagName,
        id: mockedTag.id,
      };
      const tagServSpy = jest
        .spyOn(tagService, 'updateTag')
        .mockResolvedValue(updatedTag);

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/tag/${id}`)
        .send(tag);

      // then
      return request.expect(200).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith(id, newTagName);
        expect(res.body).toEqual(updatedTag);
      });
    });
  });

  describe('DELETE /tag/:tagId', () => {
    it('expect success response with deleted tag', async () => {
      // given
      const id = mockedTag.id;
      const result = { success: true };
      const tagServSpy = jest
        .spyOn(tagService, 'deleteTag')
        .mockResolvedValue(result);

      // when
      const request = testRequest(app.getHttpServer()).delete(`/tag/${id}`);

      // then
      return request.expect(200).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith(id);
        expect(res.body).toEqual(result);
      });
    });
  });
});
