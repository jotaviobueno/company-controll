import { ObjectType } from '@nestjs/graphql';
import { RolePermission } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class RolePermissionEntity
  extends IBaseEntity
  implements RolePermission
{
  permissionId: string;

  roleId: string;
}
