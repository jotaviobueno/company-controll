import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProviderInput } from 'src/domain/dtos';
import { CompanyProviderEntity } from 'src/domain/entities';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { ProviderCreateUseCase } from 'src/modules/provider/use-cases';
import { ICompanyProviderRepository } from 'src/repositories/company-provider';

@Injectable()
export class CompanyProviderCreateUseCase
  implements
    IBaseUseCase<
      CreateProviderInput & { companyId: string },
      CompanyProviderEntity
    >
{
  constructor(
    private readonly companyProviderRepository: ICompanyProviderRepository,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
    private readonly providerCreateUseCase: ProviderCreateUseCase,
  ) {}

  async execute({
    companyId,
    ...createDto
  }: CreateProviderInput & {
    companyId: string;
  }): Promise<CompanyProviderEntity> {
    const company = await this.companyFindOneUseCase.execute(companyId);

    const provider = await this.providerCreateUseCase.execute(createDto);

    const companyProvider = await this.companyProviderRepository.create({
      companyId: company.id,
      providerId: provider.id,
    });

    return companyProvider;
  }
}
