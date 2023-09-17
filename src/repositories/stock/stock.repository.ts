import { Injectable } from '@nestjs/common';
import { IStockRepository } from './istock.repository';
import { StockEntity } from 'src/domain/entities';

@Injectable()
export class StockRepository extends IStockRepository {
  findByGTE(productId: string): Promise<StockEntity> {
    return this.prismaService.stock.findFirst({
      where: {
        productId,
        type: 'INCOME',
        quantity: {
          gte: 1,
        },
      },
    });
  }
}
