import { Test, TestingModule } from '@nestjs/testing';
import {
  ProviderAddressCreateUseCase,
  ProviderAddressFindAllUseCase,
  ProviderAddressFindOneUseCase,
  ProviderAddressSoftDeleteUseCase,
  ProviderAddressUpdateUseCase,
} from './use-cases';
import {
  createAddressInputMock,
  paginationOptionsInputMock,
  providerAddressMock,
  updateCustomerAddressInputMock,
} from 'src/domain/mocks';
import { ProviderAddressResolver } from './provider-address.resolver';
import { providerAddressModuleMock } from './provider-address.module';

describe('ProviderAddressResolver', () => {
  let resolver: ProviderAddressResolver;
  let moduleRef: TestingModule;

  let createUseCase: ProviderAddressCreateUseCase;
  let findAllUseCase: ProviderAddressFindAllUseCase;
  let findOneUseCase: ProviderAddressFindOneUseCase;
  let softDeleteUseCase: ProviderAddressSoftDeleteUseCase;
  let updateUseCase: ProviderAddressUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      providerAddressModuleMock,
    ).compile();

    resolver = moduleRef.get<ProviderAddressResolver>(ProviderAddressResolver);
    createUseCase = moduleRef.get<ProviderAddressCreateUseCase>(
      ProviderAddressCreateUseCase,
    );
    findAllUseCase = moduleRef.get<ProviderAddressFindAllUseCase>(
      ProviderAddressFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<ProviderAddressFindOneUseCase>(
      ProviderAddressFindOneUseCase,
    );
    updateUseCase = moduleRef.get<ProviderAddressUpdateUseCase>(
      ProviderAddressUpdateUseCase,
    );
    softDeleteUseCase = moduleRef.get<ProviderAddressSoftDeleteUseCase>(
      ProviderAddressSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(providerAddressMock);

    expect(
      await resolver.createProviderAddress(createAddressInputMock, {
        id: '1',
      }),
    ).toStrictEqual(providerAddressMock);
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([providerAddressMock]);

    expect(
      await resolver.findAllProviderAddress(paginationOptionsInputMock),
    ).toStrictEqual([providerAddressMock]);
  });

  it('should findOne', async () => {
    jest
      .spyOn(findOneUseCase, 'execute')
      .mockResolvedValue(providerAddressMock);

    expect(await resolver.findOneProviderAddress({ id: '1' })).toStrictEqual(
      providerAddressMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(providerAddressMock);

    expect(
      await resolver.updateProviderAddress(updateCustomerAddressInputMock),
    ).toStrictEqual(providerAddressMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeProviderAddress({ id: '1' })).toStrictEqual(
      true,
    );
  });
});
