import { INestApplication } from '@nestjs/common';
import * as testRequest from 'supertest';

import { TagController } from '@/api/tag/tag.controller';
import { TagService } from '@/api/tag/tag.service';
import { STUB_TAG } from 'test/api/tag/stub';
import createTestingModule from 'test/utils/createTestingModule';

describe('TagController', () => {
  const stubTag = Object.assign({}, STUB_TAG);
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
      const userId = stubTag.user.id;
      const reqBody = { name: stubTag.name };
      const resBody = { name: stubTag.name, id: stubTag.id };
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .post('/tag')
        .send(reqBody);

      // then
      return request.expect(201).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith({
          userId,
          tagName: stubTag.name,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('PUT /tag/:tagId', () => {
    it('expect success response with updated tag', async () => {
      // given
      const newTagName = 'new tag name';
      const tagId = stubTag.id;
      const userId = stubTag.user.id;
      const reqBody = { name: newTagName };
      const resBody = {
        name: newTagName,
        id: stubTag.id,
      };
      const tagServSpy = jest
        .spyOn(tagService, 'updateTag')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/tag/${tagId}`)
        .send(reqBody);

      // then
      return request.expect(200).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith({
          userId,
          tagId,
          tagName: newTagName,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('DELETE /tag/:tagId', () => {
    it('expect success response with deleted tag', async () => {
      // given
      const userId = stubTag.user.id;
      const tagId = stubTag.id;
      const resBody = { success: true };
      const tagServSpy = jest
        .spyOn(tagService, 'deleteTag')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer()).delete(`/tag/${tagId}`);

      // then
      return request.expect(200).expect((res) => {
        expect(tagServSpy).toHaveBeenCalledWith({ userId, tagId });
        expect(res.body).toEqual(resBody);
      });
    });
  });
});
