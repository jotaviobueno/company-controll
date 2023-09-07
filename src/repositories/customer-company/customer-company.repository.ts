import { CustomerCompanyInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';
import { ICustomerCompanyRepository } from './icustomer-company.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerCompanyRepository
  implements Partial<ICustomerCompanyRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CustomerCompanyInput): Promise<CustomerCompanyEntity> {
    return this.prismaService.customerCompany.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CustomerCompanyEntity> {
    return this.prismaService.customerCompany.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  softDelete(id: string): Promise<CustomerCompanyEntity> {
    return this.prismaService.customerCompany.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
