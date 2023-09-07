import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { ProductUpdateUseCase } from './product-update.use-case';
import { productModuleMock } from '../../product.module';
import { productMock, updateProductInputMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';

describe('ProductUpdateUseCase', () => {
  let usecase: ProductUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(productModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<ProductUpdateUseCase>(ProductUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    const updateSpy = jest
      .spyOn(prismaService.product, 'update')
      .mockResolvedValue(productMock);

    const response = await usecase.execute(updateProductInputMock);

    expect(response).toStrictEqual(productMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.product, 'findFirst')
      .mockResolvedValue(productMock);

    jest.spyOn(prismaService.product, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateProductInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
