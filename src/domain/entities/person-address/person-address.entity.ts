import { ObjectType } from '@nestjs/graphql';
import { PersonAddress } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PersonAddressEntity extends IBaseEntity implements PersonAddress {
  personId: string;

  addressId: string;

  deletedAt: Date | null;
}
