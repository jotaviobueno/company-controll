import { ObjectType } from '@nestjs/graphql';
import { CustomerCompany } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CustomerCompanyEntity
  extends IBaseEntity
  implements CustomerCompany
{
  companyId: string;

  customerId: string;

  deletedAt: Date | null;
}
