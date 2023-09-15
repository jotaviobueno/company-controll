import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCustomerInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerSimpleCreateUseCase
  implements IBaseUseCase<CreateCustomerInput, CustomerEntity>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  execute(data: CreateCustomerInput): Promise<CustomerEntity> {
    return this.customerRepository.create(data);
  }
}
