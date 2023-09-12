import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';

import { CategoryCreateUseCase } from './category-create.use-case';
import { categoryModuleMock } from '../../category.module';
import { categoryMock, createCategoryInputMock } from 'src/domain/mocks';

describe('CategoryCreateUseCase', () => {
  let usecase: CategoryCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CategoryCreateUseCase>(CategoryCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.category, 'create')
      .mockResolvedValue(categoryMock);

    const response = await usecase.execute(createCategoryInputMock);

    expect(response).toStrictEqual(categoryMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createCategoryInputMock,
        deletedAt: null,
      },
    });
  });
});
