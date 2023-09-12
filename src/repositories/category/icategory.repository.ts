import { IBaseRepository } from 'src/domain/base';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';

export abstract class ICategoryRepository extends IBaseRepository<
  CreateCategoryInput,
  CategoryEntity,
  UpdateCategoryInput
> {
  abstract findByName(name: string): Promise<CategoryEntity>;
}
