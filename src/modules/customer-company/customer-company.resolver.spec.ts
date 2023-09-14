import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCompanyResolver } from './customer-company.resolver';
import { customerCompanyModuleMock } from './customer-company.module';
import {
  CustomerCompanyCreateUseCase,
  CustomerCompanyRemoveUseCase,
} from './use-cases';
import {
  customerCompanyInputMock,
  customerCompanyMock,
} from 'src/domain/mocks';

describe('CustomerCompanyResolver', () => {
  let resolver: CustomerCompanyResolver;

  let createUseCase: CustomerCompanyCreateUseCase;
  let removeUseCase: CustomerCompanyRemoveUseCase;

  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(
      customerCompanyModuleMock,
    ).compile();

    resolver = moduleRef.get<CustomerCompanyResolver>(CustomerCompanyResolver);
    createUseCase = moduleRef.get<CustomerCompanyCreateUseCase>(
      CustomerCompanyCreateUseCase,
    );
    removeUseCase = moduleRef.get<CustomerCompanyRemoveUseCase>(
      CustomerCompanyRemoveUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(customerCompanyMock);

    expect(
      await resolver.createCustomerCompany(customerCompanyInputMock),
    ).toStrictEqual(customerCompanyMock);
  });

  it('should remove', async () => {
    jest.spyOn(removeUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCustomerCompany({ id: '1' })).toStrictEqual(
      true,
    );
  });
});
