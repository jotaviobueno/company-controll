import { Test, TestingModule } from '@nestjs/testing';
import { CustomerResolver } from './customer.resolver';
import { customerModuleMock } from './customer.module';
import {
  CustomerFindAllUseCase,
  CustomerFindOneUseCase,
  CustomerSoftDeleteUseCase,
  CustomerUpdateUseCase,
} from './use-cases';
import {
  customerMock,
  paginationOptionsInputMock,
  updateProductInputMock,
} from 'src/domain/mocks';

describe('CustomerResolver', () => {
  let resolver: CustomerResolver;

  let findAllUseCase: CustomerFindAllUseCase;
  let findOneUseCase: CustomerFindOneUseCase;
  let updateUseCase: CustomerUpdateUseCase;
  let softDeleteUseCase: CustomerSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(customerModuleMock).compile();

    resolver = module.get<CustomerResolver>(CustomerResolver);

    findAllUseCase = module.get<CustomerFindAllUseCase>(CustomerFindAllUseCase);
    findOneUseCase = module.get<CustomerFindOneUseCase>(CustomerFindOneUseCase);
    updateUseCase = module.get<CustomerUpdateUseCase>(CustomerUpdateUseCase);
    softDeleteUseCase = module.get<CustomerSoftDeleteUseCase>(
      CustomerSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([customerMock]);

    expect(
      await resolver.findAllCustomer(paginationOptionsInputMock),
    ).toStrictEqual([customerMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(customerMock);

    expect(await resolver.findOneCustomer({ id: '1' })).toStrictEqual(
      customerMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(customerMock);

    expect(await resolver.updateCustomer(updateProductInputMock)).toStrictEqual(
      customerMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeCustomer({ id: '1' })).toStrictEqual(true);
  });
});
