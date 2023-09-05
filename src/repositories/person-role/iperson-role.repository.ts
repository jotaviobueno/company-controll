import { IBaseRepository } from 'src/domain/base';
import { PersonRoleInput } from 'src/domain/dtos';
import {
  PermissionEntity,
  PersonRoleEntity,
  RoleEntity,
  RolePermissionEntity,
} from 'src/domain/entities';

export abstract class IPersonRoleRepository extends IBaseRepository<
  PersonRoleInput,
  PersonRoleEntity
> {
  abstract findByPersonIdAndRoleId(
    personRoleInput: PersonRoleInput,
  ): Promise<PersonRoleEntity>;
  abstract findAllWithPersonid(personId: string): Promise<
    (PersonRoleEntity & {
      role: RoleEntity & {
        rolePermission: (RolePermissionEntity & {
          permission: PermissionEntity;
        })[];
      };
    })[]
  >;
  abstract findManyWithPersonId(
    personsIds: string[],
  ): Promise<PersonRoleEntity[]>;
}
