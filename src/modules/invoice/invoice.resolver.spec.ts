import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceResolver, InvoiceService],
    }).compile();

    resolver = module.get<InvoiceResolver>(InvoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
