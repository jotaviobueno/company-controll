import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';
import { CustomerFindOneUseCase } from '../find-one';
import { UpdateCustomerInput } from 'src/domain/dtos';

@Injectable()
export class CustomerUpdateUseCase
  implements IBaseUseCase<UpdateCustomerInput, CustomerEntity>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
  ) {}

  async execute(data: UpdateCustomerInput): Promise<CustomerEntity> {
    const customer = await this.customerFindOneUseCase.execute(data.id);

    const update = await this.customerRepository.update({
      ...data,
      id: customer.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
