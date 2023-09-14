import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from './icompany.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateCompanyInput,
  PaginationOptionsInput,
  UpdateCompanyInput,
} from 'src/domain/dtos';
import { CompanyEntity } from 'src/domain/entities';

@Injectable()
export class CompanyRepository implements Partial<ICompanyRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateCompanyInput): Promise<CompanyEntity> {
    return this.prismaService.company.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CompanyEntity> {
    return this.prismaService.company.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

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

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CompanyEntity[]> {
    return this.prismaService.company.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: UpdateCompanyInput): Promise<CompanyEntity> {
    return this.prismaService.company.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CompanyEntity> {
    return this.prismaService.company.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
