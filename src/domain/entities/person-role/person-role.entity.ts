import { ObjectType } from '@nestjs/graphql';
import { PersonRole } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PersonRoleEntity extends IBaseEntity implements PersonRole {
  personId: string;

  roleId: string;

  deletedAt: Date | null;
}
