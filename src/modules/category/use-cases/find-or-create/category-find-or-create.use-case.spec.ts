import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { categoryModuleMock } from '../../category.module';
import { categoryMock } from 'src/domain/mocks';
import { CategoryFindOrCreateUseCase } from './category-find-or-create.use-case';

describe('CategoryFindOrCreateUseCase', () => {
  let usecase: CategoryFindOrCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CategoryFindOrCreateUseCase>(
      CategoryFindOrCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should be return categories with already exist', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.category, 'findFirst')
      .mockResolvedValue(categoryMock);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([expect.any(String)]);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        name: '1',
        deletedAt: null,
      },
    });
  });

  it('should be return categories if category dont exist', async () => {
    jest.spyOn(prismaService.category, 'findFirst').mockResolvedValue(null);

    const findOneSpy = jest
      .spyOn(prismaService.category, 'create')
      .mockResolvedValue(categoryMock);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([expect.any(String)]);
    expect(findOneSpy).toHaveBeenCalledWith({
      data: {
        name: '1',
        deletedAt: null,
      },
    });
  });
});
