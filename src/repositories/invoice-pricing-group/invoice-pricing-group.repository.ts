import { Injectable } from '@nestjs/common';
import { IInvoicePricingGroupRepository } from './iinvoice-pricing-group.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateInvoicePricingGroupDto } from 'src/domain/dtos';
import { InvoicePricingGroupEntity } from 'src/domain/entities';

@Injectable()
export class InvoicePricingGroupRepository
  implements Partial<IInvoicePricingGroupRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateInvoicePricingGroupDto[]): Promise<any> {
    return this.prismaService.invoicePricingGroup.createMany({
      data: createDto,
    });
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePricingGroupEntity[]> {
    return this.prismaService.invoicePricingGroup.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
