import { Injectable } from '@nestjs/common';
import { ICompanyAddressRepository } from './icompany-address.repository';
import { CompanyAddressEntity } from 'src/domain/entities';

@Injectable()
export class CompanyAddressRepository extends ICompanyAddressRepository {
  findManyWithCompanyId(
    companiesIds: string[],
  ): Promise<CompanyAddressEntity[]> {
    return this.prismaService.companyAddress.findMany({
      where: {
        companyId: {
          in: companiesIds,
        },
      },
    });
  }
}
