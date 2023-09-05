import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/modules/role/decorator';
import { PersonEntity } from 'src/domain/entities';
import { PersonRoleFindAllWithPersonid } from '../use-cases';
import { PERMISSION_KEY } from 'src/modules/permission/decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly personRoleFindAllWithPersonid: PersonRoleFindAllWithPersonid,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const person = GqlExecutionContext.create(context).getContext()
      .person as PersonEntity;

    if (!person) return false;

    const permissionsAndRoles =
      await this.personRoleFindAllWithPersonid.execute(person.id);

    const requiredPermissions: string[] = this.reflector.getAllAndOverride(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let hasPermission = false;

    for (const { role } of permissionsAndRoles) {
      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some((requiredRole) => requiredRole === role.name)
      )
        hasPermission = true;

      if (requiredPermissions?.length >= 1)
        for (const { permission } of role.rolePermission) {
          if (
            requiredPermissions.some(
              (requiredPermission) => requiredPermission === permission.name,
            )
          )
            hasPermission = true;
        }
    }

    return hasPermission;
  }
}
