import { Injectable } from '@nestjs/common';
import { IPersonRoleRepository } from './iperson-role.repository';
import { PersonRoleInput } from 'src/domain/dtos';
import {
  PermissionEntity,
  PersonRoleEntity,
  RoleEntity,
  RolePermissionEntity,
} from 'src/domain/entities';

@Injectable()
export class PersonRoleRepository extends IPersonRoleRepository {
  findManyWithPersonId(personsIds: string[]): Promise<PersonRoleEntity[]> {
    return this.prismaService.personRole.findMany({
      where: {
        personId: {
          in: personsIds,
        },
      },
    });
  }

  findByPersonIdAndRoleId(
    personRoleInput: PersonRoleInput,
  ): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.findFirst({
      where: {
        ...personRoleInput,
      },
    });
  }

  findAllWithPersonid(personId: string): Promise<
    (PersonRoleEntity & {
      role: RoleEntity & {
        rolePermission: (RolePermissionEntity & {
          permission: PermissionEntity;
        })[];
      };
    })[]
  > {
    return this.prismaService.personRole.findMany({
      where: {
        personId,
      },
      include: {
        role: {
          include: {
            rolePermission: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }
}
