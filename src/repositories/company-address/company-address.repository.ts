import { Injectable } from '@nestjs/common';
import { ICompanyAddressRepository } from './icompany-address.repository';
import {
  CreateCompanyAddressInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { PrismaService } from 'src/db/prisma.service';
import { CompanyAddressEntity } from 'src/domain/entities';

@Injectable()
export class CompanyAddressRepository
  implements Partial<ICompanyAddressRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateCompanyAddressInput): Promise<CompanyAddressEntity> {
    return this.prismaService.companyAddress.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CompanyAddressEntity> {
    return this.prismaService.companyAddress.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CompanyAddressEntity[]> {
    return this.prismaService.companyAddress.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

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

  update({ id, ...updateDto }): Promise<CompanyAddressEntity> {
    return this.prismaService.companyAddress.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CompanyAddressEntity> {
    return this.prismaService.companyAddress.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
