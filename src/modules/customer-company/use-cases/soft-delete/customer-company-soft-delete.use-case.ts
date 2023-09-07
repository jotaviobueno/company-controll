import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ICustomerCompanyRepository } from 'src/repositories/customer-company';

@Injectable()
export class CustomerCompanyRemoveUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly customerCompanyRepository: ICustomerCompanyRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const customerCompany = await this.customerCompanyRepository.findById(data);

    const softDelete = await this.customerCompanyRepository.softDelete(
      customerCompany.id,
    );

    if (!softDelete)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
