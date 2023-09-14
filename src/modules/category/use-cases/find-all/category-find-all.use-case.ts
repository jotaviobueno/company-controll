import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { ICategoryRepository } from 'src/repositories/category/icategory.repository';

@Injectable()
export class CategoryFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, CategoryEntity[]>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  execute(data: PaginationOptionsInput): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll(data);
  }
}
