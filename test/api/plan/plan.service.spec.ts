import { CategoryService } from '@/api/category/category.service';
import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import { TagService } from '@/api/tag/tag.service';
import createTestingModule from 'test/utils/create-testing-module';

describe('PlanService', () => {
  let planRepository: PlanRepository;
  let planService: PlanService;
  let categoryService: CategoryService;
  let tagService: TagService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [PlanService, CategoryService, TagService],
    });

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
    tagService = moduleRef.get<TagService>(TagService);
    planService = moduleRef.get<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(tagService).toBeDefined();
    expect(planService).toBeDefined();
  });
});
