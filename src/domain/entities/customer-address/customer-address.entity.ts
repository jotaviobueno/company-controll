import { ObjectType } from '@nestjs/graphql';
import { CustomerAddress } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CustomerAddressEntity
  extends IBaseEntity
  implements CustomerAddress
{
  addressId: string;

  customerId: string;

  deletedAt: Date | null;
}
