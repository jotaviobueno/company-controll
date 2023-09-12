import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { CategoryFindAllUseCase } from './category-find-all.use-case';
import { categoryModuleMock } from '../../category.module';
import { categoryMock, paginationOptionsInputMock } from 'src/domain/mocks';

describe('CategoryFindAllUseCase', () => {
  let usecase: CategoryFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(categoryModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CategoryFindAllUseCase>(CategoryFindAllUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.category, 'findMany')
      .mockResolvedValue([categoryMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([categoryMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
