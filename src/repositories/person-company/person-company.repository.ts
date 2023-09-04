import { Injectable } from '@nestjs/common';
import { IPersonCompanyRepository } from './iperson-company.repository';
import { PrismaService } from 'src/db/prisma.service';
import { PersonCompanyInput } from 'src/domain/dtos/person-company';
import { PersonCompanyEntity } from 'src/domain/entities';
import { PaginationOptionsInput } from 'src/domain/dtos';

@Injectable()
export class PersonCompanyRepository
  implements Partial<IPersonCompanyRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: PersonCompanyInput): Promise<PersonCompanyEntity> {
    return this.prismaService.personCompany.create({
      data: {
        ...createDto,
      },
    });
  }

  findById(id: string): Promise<PersonCompanyEntity> {
    return this.prismaService.personCompany.findFirst({
      where: { id },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<PersonCompanyEntity[]> {
    return this.prismaService.personCompany.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }
}
