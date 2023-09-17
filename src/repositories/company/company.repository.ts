import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from './icompany.repository';
import { CompanyEntity } from 'src/domain/entities';

@Injectable()
export class CompanyRepository extends ICompanyRepository {
  findByCnpj(cnpj: string): Promise<CompanyEntity> {
    return this.prismaService.company.findFirst({
      where: {
        cnpj,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<CompanyEntity[]> {
    return this.prismaService.company.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
