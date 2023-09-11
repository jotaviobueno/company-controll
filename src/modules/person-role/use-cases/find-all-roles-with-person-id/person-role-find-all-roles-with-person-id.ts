import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import {
  PermissionEntity,
  PersonRoleEntity,
  RoleEntity,
  RolePermissionEntity,
} from 'src/domain/entities';
import { IPersonRoleRepository } from 'src/repositories/person-role';

@Injectable()
export class PersonRoleFindAllWithPersonId
  implements
    IBaseUseCase<
      string,
      (PersonRoleEntity & {
        role: RoleEntity & {
          rolePermission: (RolePermissionEntity & {
            permission: PermissionEntity;
          })[];
        };
      })[]
    >
{
  constructor(private readonly personRoleRepository: IPersonRoleRepository) {}

  execute(data: string): Promise<
    (PersonRoleEntity & {
      role: RoleEntity & {
        rolePermission: (RolePermissionEntity & {
          permission: PermissionEntity;
        })[];
      };
    })[]
  > {
    return this.personRoleRepository.findAllWithPersonid(data);
  }
}
