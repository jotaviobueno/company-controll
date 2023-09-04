import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class AddressEntity extends IBaseEntity implements Address {
  @Field()
  street: string;

  @Field()
  number: string;

  @Field()
  neighboord: string;

  @Field()
  city: string;

  @Field()
  zipCode: number;

  @Field()
  state: string;

  deletedAt: Date | null;
}
