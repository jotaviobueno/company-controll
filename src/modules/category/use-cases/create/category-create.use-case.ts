import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateCategoryInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';

@Injectable()
export class CategoryCreateUseCase
  implements IBaseUseCase<CreateCategoryInput, CategoryEntity>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryInput): Promise<CategoryEntity> {
    const categoryAlreadyExist = await this.categoryRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExist)
      throw new HttpException('This name already exist', HttpStatus.CONFLICT);

    const category = await this.categoryRepository.create(data);

    return category;
  }
}
