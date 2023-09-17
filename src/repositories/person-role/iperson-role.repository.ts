import { PersonRoleInput } from 'src/domain/dtos';
import {
  PermissionEntity,
  PersonRoleEntity,
  RoleEntity,
  RolePermissionEntity,
} from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPersonRoleRepository extends RepositoryFactory<PersonRoleEntity> {
  constructor() {
    super('personRole');
  }

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
