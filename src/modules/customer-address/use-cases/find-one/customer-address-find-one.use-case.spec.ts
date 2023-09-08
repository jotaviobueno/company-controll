import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { customerAddressMock } from 'src/domain/mocks';
import { CustomerAddressFindOneUseCase } from './customer-address-find-one.use-case';
import { customerAddressModuleMock } from '../../customer-address.module';

describe('CustomerAddressFindOneUseCase', () => {
  let usecase: CustomerAddressFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerAddressFindOneUseCase>(
      CustomerAddressFindOneUseCase,
    );
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
      .spyOn(prismaService.customerAddress, 'findFirst')
      .mockResolvedValue(customerAddressMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(customerAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found customerAddress', async () => {
    jest
      .spyOn(prismaService.customerAddress, 'findFirst')
      .mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
