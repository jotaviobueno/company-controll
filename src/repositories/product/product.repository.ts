import { Injectable } from '@nestjs/common';
import { IProductRepository } from './iproduct.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/domain/dtos/product';
import { ProductEntity } from 'src/domain/entities';
import { PaginationOptionsInput } from 'src/domain/dtos';

@Injectable()
export class ProductRepository implements Partial<IProductRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateProductInput): Promise<ProductEntity> {
    return this.prismaService.product.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<ProductEntity> {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<ProductEntity[]> {
    return this.prismaService.product.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update({ id, ...updateDto }: UpdateProductInput): Promise<ProductEntity> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<ProductEntity> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
