import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerCompanyInput } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { ICustomerCompanyRepository } from 'src/repositories/customer-company';

@Injectable()
export class CustomerCompanyCreateManyUseCase
  implements IBaseUseCase<CustomerCompanyInput[], CreateManyEntity>
{
  constructor(
    private readonly customerCompanyRepository: ICustomerCompanyRepository,
  ) {}

  execute(data: CustomerCompanyInput[]): Promise<CreateManyEntity> {
    return this.customerCompanyRepository.createMany(data);
  }
}
