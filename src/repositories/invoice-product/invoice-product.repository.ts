import { Injectable } from '@nestjs/common';
import { IInvoiceProductRepository } from './iinvoice-product.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoiceProductDto } from 'src/domain/dtos';
import { InvoiceProductEntity } from 'src/domain/entities';

@Injectable()
export class InvoiceProductRepository
  implements Partial<IInvoiceProductRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateInvoiceProductDto[]): Promise<any> {
    return this.prismaService.invoiceProduct.createMany({
      data: createDto,
    });
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProductEntity[]> {
    return this.prismaService.invoiceProduct.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
