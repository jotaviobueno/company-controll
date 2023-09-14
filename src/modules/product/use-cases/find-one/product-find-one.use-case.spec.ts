import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { ProductFindOneUseCase } from './product-find-one.use-case';
import { productModuleMock } from '../../product.module';
import { productMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';

describe('ProductFindOneUseCase', () => {
  let usecase: ProductFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProductFindOneUseCase>(ProductFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(productMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found product', async () => {
    jest.spyOn(prismaService.product, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
