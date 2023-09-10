import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerCompanyInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';
import { ICustomerCompanyRepository } from 'src/repositories/customer-company';

@Injectable()
export class CustomerCompanyCreateManyUseCase
  implements IBaseUseCase<CustomerCompanyInput[], CustomerCompanyEntity>
{
  constructor(
    private readonly customerCompanyRepository: ICustomerCompanyRepository,
  ) {}

  execute(data: CustomerCompanyInput[]): Promise<CustomerCompanyEntity> {
    return this.customerCompanyRepository.createMany(data);
  }
}
