import { ObjectType } from '@nestjs/graphql';
import { ProviderAddress } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class ProviderAddressEntity
  extends IBaseEntity
  implements ProviderAddress
{
  addressId: string;

  providerId: string;

  deletedAt: Date | null;
}
