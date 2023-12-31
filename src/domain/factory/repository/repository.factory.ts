import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';

export abstract class RepositoryFactory<E> {
  @Inject(PrismaService)
  public readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create<T>(createDto: T): Promise<E> {
    return (this.prismaService as any)[this.model].create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  createMany<T>(createDtos: T[]): Promise<CreateManyEntity> {
    const dto = createDtos.map((createDto) => ({
      ...createDto,
      deletedAt: null,
    }));

    return (this.prismaService as any)[this.model].createMany({
      data: dto,
    });
  }

  findById(id: string): Promise<E> {
    return (this.prismaService as any)[this.model].findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<E[]> {
    return (this.prismaService as any)[this.model].findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<E[]> {
    return (this.prismaService as any)[this.model].findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update<T>(updateDto: T): Promise<E> {
    // TODO: ARRUMAR ISSO DEIXAR ISSO NO PARAMETRO DA FUNÇÃO
    const { id, ...updateInput } = updateDto as any;

    return (this.prismaService as any)[this.model].update({
      where: {
        id,
      },
      data: {
        ...updateInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<E> {
    return (this.prismaService as any)[this.model].update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  delete(id: string): Promise<E> {
    return (this.prismaService as any)[this.model].delete({
      where: {
        id,
      },
    });
  }
}
