import { IBaseEntity } from 'src/domain/base';
import { ObjectType } from '@nestjs/graphql';
import { PersonCompany } from '@prisma/client';

@ObjectType()
export class PersonCompanyEntity extends IBaseEntity implements PersonCompany {
  personId: string;

  companyId: string;

  deletedAt: Date | null;
}
