import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCustomerInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerCreateUseCase
  implements IBaseUseCase<CreateCustomerInput, CustomerEntity>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: CreateCustomerInput): Promise<CustomerEntity> {
    const company = await this.companyFindOneUseCase.execute(data.companyId);

    if (data.cpf) {
      const cpfAlreadyExist = await this.customerRepository.findByCpf(data.cpf);

      if (cpfAlreadyExist)
        throw new HttpException('Cpf already exists', HttpStatus.CONFLICT);
    }

    if (data.email) {
      const emailAlreadyExist = await this.customerRepository.findByEmail(
        data.email,
      );

      if (emailAlreadyExist)
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const customer = await this.customerRepository.create({
      ...data,
      companyId: company.id,
    });

    return customer;
  }
}
