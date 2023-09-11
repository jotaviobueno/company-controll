import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceResolver } from './InvoiceResolver';
import { invoiceModuleMock } from './invoice.module';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(invoiceModuleMock).compile();

    resolver = module.get<InvoiceResolver>(InvoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
