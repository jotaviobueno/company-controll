import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ICustomerRepository } from 'src/repositories/customer';
import { CustomerFindOneUseCase } from '../find-one';

@Injectable()
export class CustomerSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const customer = await this.customerFindOneUseCase.execute(data);

    const remove = await this.customerRepository.softDelete(customer.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
