import { Injectable } from '@nestjs/common';
import { ICompanyProviderRepository } from './icompany-provider.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCompanyProviderInput } from 'src/domain/dtos';
import { CompanyProviderEntity } from 'src/domain/entities';

@Injectable()
export class CompanyProviderRepository
  implements Partial<ICompanyProviderRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createDto: CreateCompanyProviderInput,
  ): Promise<CompanyProviderEntity> {
    return this.prismaService.companyProvider.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }
}
