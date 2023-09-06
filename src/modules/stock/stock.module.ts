import { Module, ModuleMetadata } from '@nestjs/common';
import { StockResolver } from './stock.resolver';
import { StockCreateUseCase } from './use-cases';
import { IStockRepository, StockRepository } from 'src/repositories/stock';
import { ProductModule } from '../product/product.module';

export const stockModuleStock: ModuleMetadata = {
  imports: [ProductModule],
  providers: [
    StockResolver,
    StockCreateUseCase,
    { provide: IStockRepository, useClass: StockRepository },
  ],
};

@Module(stockModuleStock)
export class StockModule {}
