import { INestApplication } from '@nestjs/common';
import * as testRequest from 'supertest';

import { CategoryController } from '@/api/category/category.controller';
import { CategoryService } from '@/api/category/category.service';
import { THexColor } from '@/types';
import createTestingModule from 'test/utils/createTestingModule';

import { STUB_CATEGORY } from './stub';

describe('CategoryController', () => {
  const stubCategory = Object.assign({}, STUB_CATEGORY);
  let app: INestApplication;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [CategoryController],
    });

    app = moduleRef.createNestApplication();
    await app.init();
    categoryService = await app.resolve<CategoryService>(CategoryService);
  });

  it('Check defining Modules', () => {
    expect(CategoryService).toBeDefined();
  });

  describe('GET /category', () => {
    it('get all category', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const resBody = STUB_CATEGORY.map((category) => ({
        name: category.name,
        id: category.id,
        color: `#${category.color}` as THexColor,
      }));
      const categoryServSpy = jest
        .spyOn(categoryService, 'readCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer()).get('/category');

      // then
      return request.expect(200).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith(userId);
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('POST /category', () => {
    it('expect success response with created category (without color)', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryName = stubCategory[0].name;
      const categoryId = stubCategory[0].id;
      const color = stubCategory[0].color;
      const reqBody = { name: categoryName };
      const resBody = {
        name: categoryName,
        id: categoryId,
        color: `#${color}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'createCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .post('/category')
        .send(reqBody);

      // then
      return request.expect(201).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({
          categoryName,
          userId,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('POST /category', () => {
    it('expect success response with created category (with color)', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryName = stubCategory[0].name;
      const categoryId = stubCategory[0].id;
      const color = stubCategory[0].color;
      const reqBody = { name: categoryName, color };
      const resBody = {
        name: categoryName,
        id: categoryId,
        color: `#${color}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'createCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .post('/category')
        .send(reqBody);

      // then
      return request.expect(201).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({
          categoryName,
          userId,
          color,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('PUT /category/:categoryId', () => {
    it('expect fail (without both categoryName & color)', async () => {
      // given
      const categoryId = stubCategory[0].id;

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/category/${categoryId}`)
        .send({});

      // then
      return request.expect(422);
    });
  });

  describe('PUT /category/:categoryId', () => {
    it('expect success response with updated category (only categoryName)', async () => {
      // given
      const newCategoryName = 'new category name';
      const categoryId = stubCategory[0].id;
      const userId = stubCategory[0].user.id;
      const color = stubCategory[0].color;
      const reqBody = { name: newCategoryName };
      const resBody = {
        name: newCategoryName,
        id: categoryId,
        color: `#${color}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'updateCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/category/${categoryId}`)
        .send(reqBody);

      // then
      return request.expect(200).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({
          userId,
          categoryId,
          categoryName: newCategoryName,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('PUT /category/:categoryId', () => {
    it('expect success response with updated category (only color)', async () => {
      // given
      const categoryName = stubCategory[0].name;
      const categoryId = stubCategory[0].id;
      const userId = stubCategory[0].user.id;
      const color = stubCategory[1].color;
      const reqBody = { color };
      const resBody = {
        name: categoryName,
        id: categoryId,
        color: `#${color}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'updateCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/category/${categoryId}`)
        .send(reqBody);

      // then
      return request.expect(200).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({
          userId,
          categoryId,
          color,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('PUT /category/:categoryId', () => {
    it('expect success response with updated category (without both categoryName & color)', async () => {
      // given
      const newCategoryName = 'new category name';
      const newColor = 0x333333;
      const categoryId = stubCategory[0].id;
      const userId = stubCategory[0].user.id;
      const reqBody = { name: newCategoryName, color: newColor };
      const resBody = {
        name: newCategoryName,
        id: categoryId,
        color: `#${newColor}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'updateCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/category/${categoryId}`)
        .send(reqBody);

      // then
      return request.expect(200).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({
          userId,
          categoryId,
          color: newColor,
          categoryName: newCategoryName,
        });
        expect(res.body).toEqual(resBody);
      });
    });
  });

  describe('DELETE /category/:categoryId', () => {
    it('expect success response with deleted category', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const resBody = {
        id: categoryId,
        name: categoryName,
        color: `#${color}` as THexColor,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'deleteCategory')
        .mockResolvedValue(resBody);

      // when
      const request = testRequest(app.getHttpServer()).delete(
        `/category/${categoryId}`,
      );

      // then
      return request.expect(200).expect((res) => {
        expect(categoryServSpy).toHaveBeenCalledWith({ userId, categoryId });
        expect(res.body).toEqual(resBody);
      });
    });
  });
});
