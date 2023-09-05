import { Field, ObjectType } from '@nestjs/graphql';
import { Permission } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PermissionEntity extends IBaseEntity implements Permission {
  @Field()
  name: string;
}
