import { Test, TestingModule } from '@nestjs/testing';
import { FinanceResolver } from './finance.resolver';
import { financeModuleMock } from './finance.module';

describe('FinanceResolver', () => {
  let resolver: FinanceResolver;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(financeModuleMock).compile();

    resolver = module.get<FinanceResolver>(FinanceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
