import { Injectable } from '@nestjs/common';
import { IStockRepository } from './istock.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateStockInput, UpdateStockInput } from 'src/domain/dtos/stock';
import { StockEntity } from 'src/domain/entities';

@Injectable()
export class StockRepository implements Partial<IStockRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateStockInput): Promise<StockEntity> {
    return this.prismaService.stock.create({
      data: {
        ...createDto,
      },
    });
  }

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

  update({ id, ...updateDto }: UpdateStockInput): Promise<StockEntity> {
    return this.prismaService.stock.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }
}
