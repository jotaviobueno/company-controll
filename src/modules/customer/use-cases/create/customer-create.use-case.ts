import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCustomerInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { ICustomerRepository } from 'src/repositories/customer';

@Injectable()
export class CustomerCreateUseCase
  implements IBaseUseCase<CreateCustomerInput, CustomerEntity>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}

  // TODO: ARRUMAR ESSE MODULE E O MODULE DE CUSTOMER COMPANY

  async execute(data: CreateCustomerInput): Promise<CustomerEntity> {
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
    });

    return customer;
  }
}
