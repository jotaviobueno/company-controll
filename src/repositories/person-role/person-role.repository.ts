import { Injectable } from '@nestjs/common';
import { IPersonRoleRepository } from './iperson-role.repository';
import { PrismaService } from 'src/db/prisma.service';
import { PersonRoleInput } from 'src/domain/dtos';
import {
  PermissionEntity,
  PersonRoleEntity,
  RoleEntity,
  RolePermissionEntity,
} from 'src/domain/entities';

@Injectable()
export class PersonRoleRepository implements Partial<IPersonRoleRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: PersonRoleInput): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.create({
      data: {
        ...createDto,
      },
    });
  }

  findById(id: string): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.findFirst({
      where: {
        id,
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

  findManyWithPersonId(personsIds: string[]): Promise<PersonRoleEntity[]> {
    return this.prismaService.personRole.findMany({
      where: {
        personId: {
          in: personsIds,
        },
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

  delete(id: string): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.delete({
      where: {
        id,
      },
    });
  }
}
