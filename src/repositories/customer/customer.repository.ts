import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from './icustomer.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateCustomerInput,
  PaginationOptionsInput,
  UpdateCustomerInput,
} from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';

@Injectable()
export class CustomerRepository implements Partial<ICustomerRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateCustomerInput): Promise<CustomerEntity> {
    return this.prismaService.customer.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CustomerEntity[]> {
    return this.prismaService.customer.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByCpf(cpf: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        cpf,
        deletedAt: null,
      },
    });
  }

  findByEmail(email: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  update({ id, ...updateDto }: UpdateCustomerInput): Promise<CustomerEntity> {
    return this.prismaService.customer.update({
      where: { id },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CustomerEntity> {
    return this.prismaService.customer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
