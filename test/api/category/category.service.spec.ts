import { ConflictException, ForbiddenException } from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';
import { CategoryService } from '@/api/category/category.service';
import createTestingModule from 'test/utils/create-testing-module';

import { STUB_CATEGORY } from './stub';
import { USER_STUB } from '../user/stub';

describe('CategoryService', () => {
  const stubCategory = STUB_CATEGORY;

  let categoryRepo: CategoryRepository;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [CategoryService],
    });

    categoryRepo = moduleRef.get<CategoryRepository>(CategoryRepository);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
  });

  it('Check defining Modules', () => {
    expect(categoryRepo).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('checkUserOwnCategory', () => {
    it(`should pass - userId & category's userId are same`, async () => {
      const args = {
        userId: USER_STUB.id,
        categoryId: STUB_CATEGORY[0].id,
      };
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'findOnlyUserId')
        .mockResolvedValue(args.userId);

      await categoryService.checkUserOwnCategory(args);

      expect(categoryRepoSpy).toHaveBeenCalledTimes(1);
      expect(categoryRepoSpy).toHaveBeenCalledWith(args.categoryId);
    });

    it(`expect throw error when category does not exist`, async () => {
      const args = {
        userId: USER_STUB.id,
        categoryId: STUB_CATEGORY[0].id,
      };
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'findOnlyUserId')
        .mockResolvedValue(null);

      try {
        await categoryService.checkUserOwnCategory(args);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(categoryRepoSpy).toHaveBeenCalledTimes(1);
        expect(categoryRepoSpy).toHaveBeenCalledWith(args.categoryId);
        expect(error).toBeInstanceOf(ConflictException);
        expect(typeof error.message).toBe('string');
      }
    });

    it(`expect throw error when category's userId is not same with userId`, async () => {
      const args = {
        userId: USER_STUB.id,
        categoryId: STUB_CATEGORY[0].id,
      };
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'findOnlyUserId')
        .mockResolvedValue(Infinity);

      try {
        await categoryService.checkUserOwnCategory(args);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(categoryRepoSpy).toHaveBeenCalledTimes(1);
        expect(categoryRepoSpy).toHaveBeenCalledWith(args.categoryId);
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(typeof error.message).toBe('string');
      }
    });
  });

  describe('checkHasCategory', () => {
    it(`should pass if categoryId is existing in database`, async () => {
      const categoryId = STUB_CATEGORY[0].id;
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'exist')
        .mockResolvedValue(true);

      await categoryService.checkHasCategory(categoryId);

      expect(categoryRepoSpy).toHaveBeenCalledTimes(1);
      expect(categoryRepoSpy).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });

    it(`expect throw conflict error if categoryId is not existed in database`, async () => {
      const categoryId = STUB_CATEGORY[0].id;
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'exist')
        .mockResolvedValue(false);

      try {
        await categoryService.checkHasCategory(categoryId);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(categoryRepoSpy).toHaveBeenCalledTimes(1);
        expect(categoryRepoSpy).toHaveBeenCalledWith({
          where: { id: categoryId },
        });
        expect(error).toBeInstanceOf(ConflictException);
        expect(typeof error.message).toBe('string');
      }
    });
  });

  describe('success read', () => {
    it('return category list', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const repoRet = stubCategory.map(({ id, name, color }) => ({
        id,
        name,
        color,
      }));
      const shouldBe = stubCategory.map(({ id, name, color }) => ({
        id,
        name,
        color: `#${color}`,
      }));
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'readCategory')
        .mockResolvedValue(repoRet);

      // when
      const categories = await categoryService.readCategory(userId);

      // then
      expect(categoryRepoSpy).toHaveBeenCalledWith(userId);
      expect(categories).toEqual(shouldBe);
    });
  });

  describe('fail create category', () => {
    it('try to make already existed category', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const categoryId = stubCategory[0].id;

      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryByName')
        .mockResolvedValue({
          id: categoryId,
          name: categoryName,
          color,
        });

      try {
        // when
        await categoryService.createCategory({ userId, categoryName, color });
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
      expect(categoryRepoFind).toHaveBeenCalledWith({
        userId,
        categoryName,
      });
    });
  });

  describe('success create', () => {
    it('request with color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const categoryId = stubCategory[0].id;
      const repoRet = {
        name: categoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: categoryName,
        id: categoryId,
        color: `#${color}`,
      };
      const params = {
        userId,
        categoryName,
      };
      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryByName')
        .mockResolvedValue(null);
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'createCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.createCategory(params);

      // then
      expect(categoryRepoFind).toHaveBeenCalledWith(params);
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });

    it('request without color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const categoryId = stubCategory[0].id;
      const repoRet = {
        name: categoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: categoryName,
        id: categoryId,
        color: `#${color}`,
      };
      const params = {
        userId,
        categoryName,
        color,
      };
      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryByName')
        .mockResolvedValue(null);
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'createCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.createCategory(params);

      // then
      expect(categoryRepoFind).toHaveBeenCalledWith({
        userId,
        categoryName,
      });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });
  });

  describe('fail update', () => {
    it('try to update not existed category', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;

      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue(null);

      try {
        // when
        await categoryService.updateCategory({
          userId,
          categoryName,
          categoryId,
          color,
        });
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
      expect(categoryRepoFind).toHaveBeenCalledWith({
        userId,
        categoryId,
      });
    });

    it('try to update category to same name', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;

      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({ name: categoryName, id: categoryId, color });

      try {
        // when
        await categoryService.updateCategory({
          userId,
          categoryName,
          categoryId,
        });
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }

      expect(categoryRepoFind).toHaveBeenCalledWith({
        userId,
        categoryId,
      });
    });

    it('try to update category to same color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;

      const categoryRepoFind = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({ name: categoryName, id: categoryId, color });

      try {
        // when
        await categoryService.updateCategory({
          userId,
          categoryId,
          color,
        });
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(ConflictException);
      }
      expect(categoryRepoFind).toHaveBeenCalledWith({
        userId,
        categoryId,
      });
    });
  });

  describe('success update', () => {
    it('with only different categoryName', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const newCategoryName = 'new Category Name';
      const params = {
        userId,
        categoryId,
        categoryName: newCategoryName,
      };
      const repoRet = {
        name: newCategoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: newCategoryName,
        id: categoryId,
        color: `#${color}`,
      };

      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({
          name: categoryName,
          id: categoryId,
          color,
        });

      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'updateCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.updateCategory(params);

      // then
      expect(categoryFindById).toHaveBeenCalledWith({ userId, categoryId });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });

    it('with only different color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const newColor = stubCategory[1].color;
      const params = {
        userId,
        categoryId,
        color: newColor,
      };
      const repoRet = {
        name: categoryName,
        id: categoryId,
        color: newColor,
      };
      const shouldBe = {
        name: categoryName,
        id: categoryId,
        color: `#${newColor}`,
      };

      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({
          name: categoryName,
          id: categoryId,
          color,
        });

      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'updateCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.updateCategory(params);

      // then
      expect(categoryFindById).toHaveBeenCalledWith({ userId, categoryId });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });

    it('with different categoryName and same color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const newCategoryName = 'new Category Name';
      const params = {
        userId,
        categoryId,
        color,
        categoryName: newCategoryName,
      };
      const repoRet = {
        name: newCategoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: newCategoryName,
        id: categoryId,
        color: `#${color}`,
      };

      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({
          name: categoryName,
          id: categoryId,
          color,
        });

      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'updateCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.updateCategory(params);

      // then
      expect(categoryFindById).toHaveBeenCalledWith({ userId, categoryId });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });

    it('with different color and same categoryName', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const newColor = stubCategory[1].color;
      const params = {
        userId,
        categoryId,
        categoryName,
        color: newColor,
      };
      const repoRet = {
        name: categoryName,
        id: categoryId,
        color: newColor,
      };
      const shouldBe = {
        name: categoryName,
        id: categoryId,
        color: `#${newColor}`,
      };

      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({
          name: categoryName,
          id: categoryId,
          color,
        });

      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'updateCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.updateCategory(params);

      // then
      expect(categoryFindById).toHaveBeenCalledWith({ userId, categoryId });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });

    it('with both different name and color', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const newCategoryName = 'new Category Name';
      const params = {
        userId,
        categoryId,
        color,
        categoryName: newCategoryName,
      };
      const repoRet = {
        name: newCategoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: newCategoryName,
        id: categoryId,
        color: `#${color}`,
      };

      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue({
          name: categoryName,
          id: categoryId,
          color,
        });

      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'updateCategory')
        .mockResolvedValue(repoRet);

      // when
      const category = await categoryService.updateCategory(params);

      // then
      expect(categoryFindById).toHaveBeenCalledWith({ userId, categoryId });
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });
  });

  describe('success delete', () => {
    it('success delete category', async () => {
      // given
      const userId = stubCategory[0].user.id;
      const categoryId = stubCategory[0].id;
      const categoryName = stubCategory[0].name;
      const color = stubCategory[0].color;
      const params = {
        userId,
        categoryId,
      };
      const repoRet = {
        name: categoryName,
        id: categoryId,
        color,
      };
      const shouldBe = {
        name: categoryName,
        id: categoryId,
        color: `#${color}`,
      };
      const categoryCheckUserOwnCategorySpy = jest
        .spyOn(categoryService, 'checkUserOwnCategory')
        .mockResolvedValue(undefined);
      const categoryFindById = jest
        .spyOn(categoryRepo, 'findCategoryById')
        .mockResolvedValue(repoRet);
      const categoryRepoSpy = jest
        .spyOn(categoryRepo, 'deleteCategory')
        .mockResolvedValue(true);

      // when
      const category = await categoryService.deleteCategory(params);

      // then
      expect(categoryCheckUserOwnCategorySpy).toHaveBeenCalledWith(params);
      expect(categoryFindById).toHaveBeenCalledWith(params);
      expect(categoryRepoSpy).toHaveBeenCalledWith(params);
      expect(category).toEqual(shouldBe);
    });
  });
});
