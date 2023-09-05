import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAddressResolver } from './company-address.resolver';
import { companyAddressModuleMock } from './company-address.module';

describe('CompanyAddressResolver', () => {
  let resolver: CompanyAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      companyAddressModuleMock,
    ).compile();

    resolver = module.get<CompanyAddressResolver>(CompanyAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
