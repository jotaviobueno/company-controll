import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { customerModuleMock } from '../../customer.module';
import { CustomerSoftDeleteUseCase } from './customer-soft-delete.use-case';
import { customerMock } from 'src/domain/mocks';

describe('CustomerSoftDeleteUseCase', () => {
  let usecase: CustomerSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerSoftDeleteUseCase>(
      CustomerSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    const updateSpy = jest
      .spyOn(prismaService.customer, 'update')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(true);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    jest.spyOn(prismaService.customer, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
