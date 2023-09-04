import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAddressResolver } from './company-address.resolver';

describe('CompanyAddressResolver', () => {
  let resolver: CompanyAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAddressResolver],
    }).compile();

    resolver = module.get<CompanyAddressResolver>(CompanyAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
