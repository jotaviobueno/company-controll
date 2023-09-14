import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerFindManyWithIdsUseCase
  implements IBaseUseCase<string[], CustomerEntity[]>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  execute(data: string[]): Promise<CustomerEntity[]> {
    return this.customerRepository.findManyWithIds(data);
  }
}
