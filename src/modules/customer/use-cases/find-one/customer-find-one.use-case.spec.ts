import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { customerMock } from 'src/domain/mocks';
import { customerModuleMock } from '../../customer.module';
import { CustomerFindOneUseCase } from './customer-find-one.use-case';
import { HttpException } from '@nestjs/common';

describe('CustomerFindOneUseCase', () => {
  let usecase: CustomerFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(customerModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerFindOneUseCase>(CustomerFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(customerMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found customer', async () => {
    jest.spyOn(prismaService.customer, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
