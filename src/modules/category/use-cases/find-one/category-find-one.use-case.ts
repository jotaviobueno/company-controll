import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CategoryEntity } from 'src/domain/entities';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';

@Injectable()
export class CategoryFindOneUseCase
  implements IBaseUseCase<string, CategoryEntity>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(data: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(data);

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return category;
  }
}
