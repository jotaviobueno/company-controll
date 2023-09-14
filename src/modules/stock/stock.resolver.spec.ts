import { Test, TestingModule } from '@nestjs/testing';
import { StockResolver } from './stock.resolver';
import { stockModuleStock } from './stock.module';
import { StockCreateUseCase } from './use-cases';
import { createStockInputMock, stockMock } from 'src/domain/mocks';

describe('StockResolver', () => {
  let resolver: StockResolver;
  let moduleRef: TestingModule;

  let createUseCase: StockCreateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(stockModuleStock).compile();

    resolver = moduleRef.get<StockResolver>(StockResolver);
    createUseCase = moduleRef.get<StockCreateUseCase>(StockCreateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(stockMock);

    expect(await resolver.createStock(createStockInputMock)).toStrictEqual(
      stockMock,
    );
  });
});
