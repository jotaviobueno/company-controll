import { Injectable } from '@nestjs/common';
import { IInvoiceRepository } from './iinvoice.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceInput } from 'src/domain/dtos/invoice';
import { InvoiceEntity } from 'src/domain/entities';
import { PaginationOptionsInput } from 'src/domain/dtos';

@Injectable()
export class InvoiceRepository implements Partial<IInvoiceRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateInvoiceInput): Promise<InvoiceEntity> {
    return this.prismaService.invoice.create({
      data: {
        ...createDto,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<InvoiceEntity[]> {
    return this.prismaService.invoice.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findManyWithIds(ids: string[]): Promise<InvoiceEntity[]> {
    return this.prismaService.invoice.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findById(id: string): Promise<InvoiceEntity> {
    return this.prismaService.invoice.findFirst({
      where: {
        id,
      },
    });
  }
}
