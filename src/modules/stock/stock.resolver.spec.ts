import { Test, TestingModule } from '@nestjs/testing';
import { StockResolver } from './stock.resolver';
import { stockModuleStock } from './stock.module';

describe('StockResolver', () => {
  let resolver: StockResolver;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(stockModuleStock).compile();

    resolver = module.get<StockResolver>(StockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
