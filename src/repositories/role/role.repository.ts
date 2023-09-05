import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './irole.repository';
import { PrismaService } from 'src/db/prisma.service';
import { RoleEntity } from 'src/domain/entities';
import { PaginationOptionsInput, UpdateRoleInput } from 'src/domain/dtos';

@Injectable()
export class RoleRepository implements Partial<IRoleRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: string): Promise<RoleEntity> {
    return this.prismaService.role.findFirst({
      where: {
        id,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: Partial<UpdateRoleInput>): Promise<RoleEntity> {
    return this.prismaService.role.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }
}
