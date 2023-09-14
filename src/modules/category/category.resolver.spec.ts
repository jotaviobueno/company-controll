import { Test, TestingModule } from '@nestjs/testing';
import { CategoryResolver } from './category.resolver';
import { categoryModuleMock } from './category.module';
import {
  CategoryFindAllUseCase,
  CategoryFindOneUseCase,
  CategorySoftDeleteUseCase,
  CategoryUpdateUseCase,
} from './use-cases';
import {
  categoryMock,
  paginationOptionsInputMock,
  updateCategoryInputMock,
} from 'src/domain/mocks';

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;
  let moduleRef: TestingModule;

  let findAllUseCase: CategoryFindAllUseCase;
  let findOneUseCase: CategoryFindOneUseCase;
  let softDeleteUseCase: CategorySoftDeleteUseCase;
  let updateUseCase: CategoryUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    resolver = moduleRef.get<CategoryResolver>(CategoryResolver);
    findAllUseCase = moduleRef.get<CategoryFindAllUseCase>(
      CategoryFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<CategoryFindOneUseCase>(
      CategoryFindOneUseCase,
    );
    softDeleteUseCase = moduleRef.get<CategorySoftDeleteUseCase>(
      CategorySoftDeleteUseCase,
    );
    updateUseCase = moduleRef.get<CategoryUpdateUseCase>(CategoryUpdateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([categoryMock]);

    expect(
      await resolver.findAllCategory(paginationOptionsInputMock),
    ).toStrictEqual([categoryMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(categoryMock);

    expect(await resolver.findOneCategory({ id: '1' })).toStrictEqual(
      categoryMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(categoryMock);

    expect(
      await resolver.updateCategory(updateCategoryInputMock),
    ).toStrictEqual(categoryMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCategory({ id: '1' })).toStrictEqual(true);
  });
});
