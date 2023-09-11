import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IBaseDataloader } from 'src/domain/base';
import { CompanyEntity } from 'src/domain/entities';
import { CompanyFindManyWithIdsUseCase } from 'src/modules/company/use-cases';
import { InvoiceCompanyFindManyWithInvoicesIdsUseCase } from 'src/modules/invoice-company/use-cases';

@Injectable()
export class LoaderCompanyByInvoiceId
  implements IBaseDataloader<string, CompanyEntity>
{
  dataLoader: DataLoader<string, CompanyEntity[]>;

  constructor(
    private readonly invoiceCompanyFindManyWithInvoicesIdsUseCase: InvoiceCompanyFindManyWithInvoicesIdsUseCase,
    private readonly companyFindManyWithIdsUseCase: CompanyFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, CompanyEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<CompanyEntity[][]> {
    const invoiceCompanies =
      await this.invoiceCompanyFindManyWithInvoicesIdsUseCase.execute(data);

    const companiesIds = invoiceCompanies.map(
      (invoiceCompany) => invoiceCompany.companyId,
    );

    const companies =
      await this.companyFindManyWithIdsUseCase.execute(companiesIds);

    const companiesMap: Record<string, CompanyEntity[]> = {};

    invoiceCompanies.forEach((invoiceCompany) => {
      companies.forEach((company) => {
        if (!companiesMap[invoiceCompany.invoiceId])
          companiesMap[invoiceCompany.invoiceId] = [];

        if (company.id === invoiceCompany.companyId)
          companiesMap[invoiceCompany.invoiceId].push(company);
      });
    });

    return data.map((id) => companiesMap[id] ?? []);
  }

  load(data: string): Promise<CompanyEntity[]> {
    return this.dataLoader.load(data);
  }
}
