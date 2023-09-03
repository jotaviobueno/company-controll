import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PersonEntity extends IBaseEntity implements Person {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  phone: string | null;

  @Field()
  avatarUrl: string;

  accessId: string;

  deletedAt: Date | null;
}
