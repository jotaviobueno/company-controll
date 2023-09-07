import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, CustomerEntity[]>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  execute(data: PaginationOptionsInput): Promise<CustomerEntity[]> {
    return this.customerRepository.findAll(data);
  }
}
