import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerFindByCpfUseCase
  implements IBaseUseCase<string, CustomerEntity>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(data: string): Promise<CustomerEntity> {
    return this.customerRepository.findByCpf(data);
  }
}
