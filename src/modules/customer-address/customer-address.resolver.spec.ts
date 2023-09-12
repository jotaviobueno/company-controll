import { Test, TestingModule } from '@nestjs/testing';
import {
  CustomerAddressCreateUseCase,
  CustomerAddressFindAllUseCase,
  CustomerAddressFindOneUseCase,
  CustomerAddressSoftDeleteUseCase,
  CustomerAddressUpdateUseCase,
} from './use-cases';
import {
  createAddressInputMock,
  customerAddressMock,
  paginationOptionsInputMock,
  updateCustomerAddressInputMock,
} from 'src/domain/mocks';
import { CustomerAddressResolver } from './customer-address.resolver';
import { customerAddressModuleMock } from './customer-address.module';

describe('CustomerAddressResolver', () => {
  let resolver: CustomerAddressResolver;
  let moduleRef: TestingModule;

  let createUseCase: CustomerAddressCreateUseCase;
  let findAllUseCase: CustomerAddressFindAllUseCase;
  let findOneUseCase: CustomerAddressFindOneUseCase;
  let softDeleteUseCase: CustomerAddressSoftDeleteUseCase;
  let updateUseCase: CustomerAddressUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerAddressModuleMock,
    ).compile();

    resolver = moduleRef.get<CustomerAddressResolver>(CustomerAddressResolver);
    createUseCase = moduleRef.get<CustomerAddressCreateUseCase>(
      CustomerAddressCreateUseCase,
    );
    findAllUseCase = moduleRef.get<CustomerAddressFindAllUseCase>(
      CustomerAddressFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<CustomerAddressFindOneUseCase>(
      CustomerAddressFindOneUseCase,
    );
    updateUseCase = moduleRef.get<CustomerAddressUpdateUseCase>(
      CustomerAddressUpdateUseCase,
    );
    softDeleteUseCase = moduleRef.get<CustomerAddressSoftDeleteUseCase>(
      CustomerAddressSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(customerAddressMock);

    expect(
      await resolver.createCustomerAddress(createAddressInputMock, {
        id: '1',
      }),
    ).toStrictEqual(customerAddressMock);
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([customerAddressMock]);

    expect(
      await resolver.findAllCustomerAddress(paginationOptionsInputMock),
    ).toStrictEqual([customerAddressMock]);
  });

  it('should findOne', async () => {
    jest
      .spyOn(findOneUseCase, 'execute')
      .mockResolvedValue(customerAddressMock);

    expect(await resolver.findOneCustomerAddress({ id: '1' })).toStrictEqual(
      customerAddressMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(customerAddressMock);

    expect(
      await resolver.updateCustomerAddress(updateCustomerAddressInputMock),
    ).toStrictEqual(customerAddressMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCustomerAddress({ id: '1' })).toStrictEqual(
      true,
    );
  });
});
