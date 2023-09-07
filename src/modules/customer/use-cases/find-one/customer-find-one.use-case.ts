import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerFindOneUseCase
  implements IBaseUseCase<string, CustomerEntity>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(data: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findById(data);

    if (!customer)
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

    return customer;
  }
}
