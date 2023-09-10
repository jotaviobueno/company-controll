import { Injectable } from '@nestjs/common';
import { IInvoiceRepository } from './iinvoice.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceInput } from 'src/domain/dtos/invoice';
import { InvoiceEntity } from 'src/domain/entities';

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
}
