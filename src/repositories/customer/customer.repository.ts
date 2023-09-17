import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from './icustomer.repository';
import { CustomerEntity } from 'src/domain/entities';

@Injectable()
export class CustomerRepository extends ICustomerRepository {
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
}
