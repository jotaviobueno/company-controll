import { Test, TestingModule } from '@nestjs/testing';
import { StockResolver } from './stock.resolver';
import { stockModuleStock } from './stock.module';
import { StockHandlerUseCase } from './use-cases';
import { createStockInputMock, stockMock } from 'src/domain/mocks';

describe('StockResolver', () => {
  let resolver: StockResolver;
  let stockHandlerUseCase: StockHandlerUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(stockModuleStock).compile();

    resolver = module.get<StockResolver>(StockResolver);
    stockHandlerUseCase = module.get<StockHandlerUseCase>(StockHandlerUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(stockHandlerUseCase, 'execute').mockResolvedValue(stockMock);

    expect(await resolver.createStock(createStockInputMock)).toStrictEqual(
      stockMock,
    );
  });
});
