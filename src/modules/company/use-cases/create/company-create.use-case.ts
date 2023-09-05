import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCompanyInput } from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';
import { getCnpj } from 'src/domain/utils';
import { CreatePersonCompanyUseCase } from 'src/modules/person-company/use-cases';
import { ICompanyRepository } from 'src/repositories/company';

@Injectable()
export class CompanyCreateUseCase
  implements IBaseUseCase<CreateCompanyInput, CompanyEntity, string>
{
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly createPersonCompanyUseCase: CreatePersonCompanyUseCase,
  ) {}

  async execute(
    data: CreateCompanyInput,
    value: string,
  ): Promise<CompanyEntity> {
    const cnpjAlreadyExist = await this.companyRepository.findByCnpj(data.cnpj);

    if (cnpjAlreadyExist)
      throw new HttpException('Cnpj already exists', HttpStatus.CONFLICT);

    const cnpjInformationResponse = await getCnpj(data.cnpj);

    const company = await this.companyRepository.create({
      ...cnpjInformationResponse,
    });

    await this.createPersonCompanyUseCase.execute({
      companyId: company.id,
      personId: value,
    });

    // TODO: na resposta agente recebe o endereço

    return company;
  }
}
