import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  customerAddressMock,
  updateCompanyAddressInputMock,
} from 'src/domain/mocks';
import { CustomerAddressUpdateUseCase } from './customer-address.update.use-case';
import { customerAddressModuleMock } from '../../customer-address.module';

describe('CustomerAddressUpdateUseCase', () => {
  let usecase: CustomerAddressUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerAddressUpdateUseCase>(
      CustomerAddressUpdateUseCase,
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
    const findOneSpy = jest
      .spyOn(prismaService.customerAddress, 'findFirst')
      .mockResolvedValue(customerAddressMock);

    jest
      .spyOn(prismaService.address, 'findFirst')
      .mockResolvedValue(addressMock);

    jest.spyOn(prismaService.address, 'update').mockResolvedValue(addressMock);

    const response = await usecase.execute(updateCompanyAddressInputMock);

    expect(response).toStrictEqual(customerAddressMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });
});
