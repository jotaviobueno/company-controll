import { Test, TestingModule } from '@nestjs/testing';
import { invoiceModuleMock } from './invoice.module';
import { InvoiceResolver } from './invoice.resolver';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(invoiceModuleMock).compile();

    resolver = moduleRef.get<InvoiceResolver>(InvoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });
});
