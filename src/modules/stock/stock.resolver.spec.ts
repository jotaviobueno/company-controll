import { Test, TestingModule } from '@nestjs/testing';
import { StockResolver } from './stock.resolver';
import { stockModuleStock } from './stock.module';
import { StockHandlerUseCase } from './use-cases';
import { createStockInputMock, stockMock } from 'src/domain/mocks';

describe('StockResolver', () => {
  let resolver: StockResolver;

  let moduleRef: TestingModule;

  let stockHandlerUseCase: StockHandlerUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(stockModuleStock).compile();

    resolver = moduleRef.get<StockResolver>(StockResolver);
    stockHandlerUseCase =
      moduleRef.get<StockHandlerUseCase>(StockHandlerUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(stockHandlerUseCase, 'execute').mockResolvedValue(stockMock);

    expect(await resolver.createStock(createStockInputMock)).toStrictEqual(
      stockMock,
    );
  });
});
