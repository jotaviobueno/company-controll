import { Injectable } from '@nestjs/common';
import { IFinanceRepository } from './ifinance.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateFinanceInput } from 'src/domain/dtos';
import { FinanceEntity } from 'src/domain/entities';

@Injectable()
export class FinanceRepository implements Partial<IFinanceRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateFinanceInput): Promise<FinanceEntity> {
    return this.prismaService.finance.create({
      data: {
        ...createDto,
      },
    });
  }
}
