import { Injectable } from '@nestjs/common';
import { ICustomerAddressRepostiroy } from './icustomer-address.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateCustomerAddressInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';

@Injectable()
export class CustomerAddressRepository
  implements Partial<ICustomerAddressRepostiroy>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createDto: CreateCustomerAddressInput,
  ): Promise<CustomerAddressEntity> {
    return this.prismaService.customerAddress.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CustomerAddressEntity> {
    return this.prismaService.customerAddress.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CustomerAddressEntity[]> {
    return this.prismaService.customerAddress.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }): Promise<CustomerAddressEntity> {
    return this.prismaService.customerAddress.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CustomerAddressEntity> {
    return this.prismaService.customerAddress.update({
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
