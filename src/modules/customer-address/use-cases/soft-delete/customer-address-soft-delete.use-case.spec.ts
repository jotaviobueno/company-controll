import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { addressMock, customerAddressMock } from 'src/domain/mocks';
import { customerAddressModuleMock } from '../../customer-address.module';
import { CustomerAddressSoftDeleteUseCase } from './customer-address-soft-delete.use-case';

describe('CustomerAddressSoftDeleteUseCase', () => {
  let usecase: CustomerAddressSoftDeleteUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerAddressSoftDeleteUseCase>(
      CustomerAddressSoftDeleteUseCase,
    );
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
      .spyOn(prismaService.customerAddress, 'findFirst')
      .mockResolvedValue(customerAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const updateSpy = jest
      .spyOn(prismaService.customerAddress, 'update')
      .mockResolvedValue(customerAddressMock);

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
      .spyOn(prismaService.customerAddress, 'findFirst')
      .mockResolvedValue(customerAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    jest.spyOn(prismaService.customerAddress, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
