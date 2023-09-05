import { ObjectType } from '@nestjs/graphql';
import { CompanyAddress } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CompanyAddressEntity
  extends IBaseEntity
  implements CompanyAddress
{
  companyId: string;

  addressId: string;

  deletedAt: Date | null;
}
