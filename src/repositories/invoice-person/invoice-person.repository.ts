import { PrismaService } from 'src/db/prisma.service';
import { IInvoicePersonRepository } from './iinvoice-person.repository';
import { CreateInvoicePersonDto } from 'src/domain/dtos';
import { Injectable } from '@nestjs/common';
import { InvoicePersonEntity } from 'src/domain/entities';

@Injectable()
export class InvoicePersonRepository
  implements Partial<IInvoicePersonRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  createMany(createDto: CreateInvoicePersonDto[]): Promise<any> {
    return this.prismaService.invoicePerson.createMany({
      data: createDto,
    });
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePersonEntity[]> {
    return this.prismaService.invoicePerson.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}
