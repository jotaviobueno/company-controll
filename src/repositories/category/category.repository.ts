import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from './icategory.repository';
import { CategoryEntity } from 'src/domain/entities';

@Injectable()
export class CategoryRepository extends ICategoryRepository {
  findByName(name: string): Promise<CategoryEntity> {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }
}
