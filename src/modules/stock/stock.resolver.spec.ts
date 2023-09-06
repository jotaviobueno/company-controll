import { Test, TestingModule } from '@nestjs/testing';
import { StockResolver } from './stock.resolver';
import { stockModuleStock } from './stock.module';
import { StockCreateUseCase } from './use-cases';
import { createStockInputMock, stockMock } from 'src/domain/mocks';

describe('StockResolver', () => {
  let resolver: StockResolver;
  let createUseCase: StockCreateUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(stockModuleStock).compile();

    resolver = module.get<StockResolver>(StockResolver);
    createUseCase = module.get<StockCreateUseCase>(StockCreateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(stockMock);

    expect(await resolver.createStock(createStockInputMock)).toStrictEqual(
      stockMock,
    );
  });
});
