import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAddressResolver } from './company-address.resolver';
import { companyAddressModuleMock } from './company-address.module';
import {
  CompanyAddressCreateUseCase,
  CompanyAddressFindAllUseCase,
  CompanyAddressFindOneUseCase,
  CompanyAddressSoftDeleteUseCase,
  CompanyAddressUpdateUseCase,
} from './use-cases';
import {
  companyAddressMock,
  createAddressInputMock,
  paginationOptionsInputMock,
} from 'src/domain/mocks';

describe('CompanyAddressResolver', () => {
  let resolver: CompanyAddressResolver;
  let createUseCase: CompanyAddressCreateUseCase;
  let findAllUseCase: CompanyAddressFindAllUseCase;
  let findOneUseCase: CompanyAddressFindOneUseCase;
  let updateUseCase: CompanyAddressUpdateUseCase;
  let softDeleteUseCase: CompanyAddressSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    resolver = module.get<CompanyAddressResolver>(CompanyAddressResolver);
    createUseCase = module.get<CompanyAddressCreateUseCase>(
      CompanyAddressCreateUseCase,
    );
    findAllUseCase = module.get<CompanyAddressFindAllUseCase>(
      CompanyAddressFindAllUseCase,
    );
    findOneUseCase = module.get<CompanyAddressFindOneUseCase>(
      CompanyAddressFindOneUseCase,
    );
    updateUseCase = module.get<CompanyAddressUpdateUseCase>(
      CompanyAddressUpdateUseCase,
    );
    softDeleteUseCase = module.get<CompanyAddressSoftDeleteUseCase>(
      CompanyAddressSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(companyAddressMock);

    expect(
      await resolver.createCompanyAddress(
        {
          id: '1',
        },
        createAddressInputMock,
      ),
    ).toStrictEqual(companyAddressMock);
  });

  it('should findAll', async () => {
    jest
      .spyOn(findAllUseCase, 'execute')
      .mockResolvedValue([companyAddressMock]);

    expect(
      await resolver.findAllCompanyAddress(paginationOptionsInputMock),
    ).toStrictEqual([companyAddressMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(companyAddressMock);

    expect(await resolver.findOneCompanyAddress({ id: '1' })).toStrictEqual(
      companyAddressMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(companyAddressMock);

    expect(
      await resolver.updateCompanyAddress({ id: '1' }, createAddressInputMock),
    ).toStrictEqual(companyAddressMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCompanyAddress({ id: '1' })).toStrictEqual(
      true,
    );
  });
});
