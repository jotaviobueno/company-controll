import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class RoleEntity extends IBaseEntity implements Role {
  @Field()
  name: string;

  @Field()
  description: string;
}
