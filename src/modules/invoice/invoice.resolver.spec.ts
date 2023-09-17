import { Test, TestingModule } from '@nestjs/testing';
import { invoiceModuleMock } from './invoice.module';
import { InvoiceResolver } from './invoice.resolver';
import {
  InvoiceCreateUseCase,
  InvoiceFindAllUseCase,
  InvoiceFindOneUseCase,
} from './use-cases';
import {
  createInvoiceInputMock,
  invoiceMock,
  paginationOptionsInputMock,
} from 'src/domain/mocks';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;
  let moduleRef: TestingModule;

  let createUseCase: InvoiceCreateUseCase;
  let findAllUseCase: InvoiceFindAllUseCase;
  let findOneUseCase: InvoiceFindOneUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    resolver = moduleRef.get<InvoiceResolver>(InvoiceResolver);
    createUseCase = moduleRef.get<InvoiceCreateUseCase>(InvoiceCreateUseCase);
    findAllUseCase = moduleRef.get<InvoiceFindAllUseCase>(
      InvoiceFindAllUseCase,
    );
    findOneUseCase = moduleRef.get<InvoiceFindOneUseCase>(
      InvoiceFindOneUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(invoiceMock);

    expect(await resolver.createInvoice(createInvoiceInputMock)).toStrictEqual(
      invoiceMock,
    );
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([invoiceMock]);

    expect(
      await resolver.findAllInvoice(paginationOptionsInputMock),
    ).toStrictEqual([invoiceMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(invoiceMock);

    expect(await resolver.findOneInvoice({ id: '1' })).toStrictEqual(
      invoiceMock,
    );
  });
});
