import { Module, ModuleMetadata } from '@nestjs/common';
import { StockResolver } from './stock.resolver';
import {
  StockCreateIncomeUseCase,
  StockCreateOutcomeUseCase,
  StockHandlerUseCase,
} from './use-cases';
import { IStockRepository, StockRepository } from 'src/repositories/stock';
import { ProductModule } from '../product/product.module';

export const stockModuleStock: ModuleMetadata = {
  imports: [ProductModule],
  providers: [
    StockResolver,
    StockCreateIncomeUseCase,
    StockCreateOutcomeUseCase,
    StockHandlerUseCase,
    { provide: IStockRepository, useClass: StockRepository },
  ],
  exports: [StockHandlerUseCase],
};

@Module(stockModuleStock)
export class StockModule {}
