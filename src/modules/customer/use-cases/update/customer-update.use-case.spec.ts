import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { customerMock, updatePersonInputMock } from 'src/domain/mocks';
import { CustomerUpdateUseCase } from './customer-update.use-case';
import { customerModuleMock } from '../../customer.module';
import { HttpException } from '@nestjs/common';

describe('CustomerUpdateUseCase', () => {
  let usecase: CustomerUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerUpdateUseCase>(CustomerUpdateUseCase);
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
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    const updateSpy = jest
      .spyOn(prismaService.customer, 'update')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute(updatePersonInputMock);

    expect(response).toStrictEqual(customerMock);
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
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    jest.spyOn(prismaService.customer, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updatePersonInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
