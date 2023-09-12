import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from './icategory.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateCategoryInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';

@Injectable()
export class CategoryRepository implements Partial<ICategoryRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateCategoryInput): Promise<CategoryEntity> {
    return this.prismaService.category.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CategoryEntity> {
    return this.prismaService.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<CategoryEntity> {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CategoryEntity[]> {
    return this.prismaService.category.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: UpdateCategoryInput): Promise<CategoryEntity> {
    return this.prismaService.category.update({
      where: { id },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CategoryEntity> {
    return this.prismaService.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
