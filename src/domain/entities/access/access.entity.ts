import { Field, ObjectType } from '@nestjs/graphql';
import { Access, AccessProvider } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class AccessEntity extends IBaseEntity implements Access {
  @Field()
  provider: AccessProvider;

  token: string;

  deletedAt: Date | null;
}
