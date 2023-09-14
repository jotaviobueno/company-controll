import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { productModuleMock } from '../../product.module';
import { ProductFindAllUseCase } from './product-find-all.use-case';
import { paginationOptionsInputMock, productMock } from 'src/domain/mocks';

describe('ProductFindAllUseCase', () => {
  let usecase: ProductFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProductFindAllUseCase>(ProductFindAllUseCase);
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
      .spyOn(prismaService.product, 'findMany')
      .mockResolvedValue([productMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([productMock]);
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
