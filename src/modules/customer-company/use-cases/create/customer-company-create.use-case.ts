import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerCompanyInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { CustomerFindOneUseCase } from 'src/modules/customer/use-cases';
import { ICustomerCompanyRepository } from 'src/repositories/customer-company';

@Injectable()
export class CustomerCompanyCreateUseCase
  implements IBaseUseCase<CustomerCompanyInput, CustomerCompanyEntity>
{
  constructor(
    private readonly customerCompanyRepository: ICustomerCompanyRepository,
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: CustomerCompanyInput): Promise<CustomerCompanyEntity> {
    const company = await this.companyFindOneUseCase.execute(data.companyId);

    const customer = await this.customerFindOneUseCase.execute(data.customerId);

    const companyCustomer = await this.customerCompanyRepository.create({
      companyId: company.id,
      customerId: customer.id,
    });

    return companyCustomer;
  }
}
