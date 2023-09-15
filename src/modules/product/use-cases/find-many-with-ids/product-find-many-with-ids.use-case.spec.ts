import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { productMock } from 'src/domain/mocks';
import { ProductFindManyWithIdsUseCase } from './product-find-many-with-ids.use-case';
import { productModuleMock } from '../../product.module';

describe('ProductFindManyWithIdsUseCase', () => {
  let usecase: ProductFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProductFindManyWithIdsUseCase>(
      ProductFindManyWithIdsUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.product, 'findMany')
      .mockResolvedValue([productMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([productMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
