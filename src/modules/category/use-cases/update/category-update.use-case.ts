import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateCategoryInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';
import { CategoryFindOneUseCase } from '../find-one';

@Injectable()
export class CategoryUpdateUseCase
  implements IBaseUseCase<UpdateCategoryInput, CategoryEntity>
{
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly categoryFindOneUseCase: CategoryFindOneUseCase,
  ) {}

  async execute(data: UpdateCategoryInput): Promise<CategoryEntity> {
    const category = await this.categoryFindOneUseCase.execute(data.id);

    if (data.name) {
      const nameAlreadyExist = await this.categoryRepository.findByName(
        data.name,
      );

      if (nameAlreadyExist)
        throw new HttpException('Name already exist', HttpStatus.CONFLICT);
    }

    const update = await this.categoryRepository.update({
      id: category.id,
      ...data,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
