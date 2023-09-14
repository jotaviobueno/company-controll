import { Test, TestingModule } from '@nestjs/testing';
import { FinanceResolver } from './finance.resolver';
import { financeModuleMock } from './finance.module';

describe('FinanceResolver', () => {
  let resolver: FinanceResolver;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(financeModuleMock).compile();

    resolver = moduleRef.get<FinanceResolver>(FinanceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });
});
