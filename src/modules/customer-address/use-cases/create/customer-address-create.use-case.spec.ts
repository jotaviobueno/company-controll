import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import {
  addressMock,
  createAddressInputMock,
  createCustomerAddressInputMock,
  customerAddressMock,
  customerMock,
} from 'src/domain/mocks';
import { CustomerAddressCreateUseCase } from './customer-address-create.use-case';
import { customerAddressModuleMock } from '../../customer-address.module';

describe('CustomerAddressCreateUseCase', () => {
  let usecase: CustomerAddressCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<CustomerAddressCreateUseCase>(
      CustomerAddressCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(customerMock);

    jest.spyOn(prismaService.address, 'create').mockResolvedValue(addressMock);

    const createSpy = jest
      .spyOn(prismaService.customerAddress, 'create')
      .mockResolvedValue(customerAddressMock);

    const response = await usecase.execute({
      customerId: '1',
      ...createAddressInputMock,
    });

    expect(response).toStrictEqual(customerAddressMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createCustomerAddressInputMock,
        deletedAt: null,
      },
    });
  });
});
