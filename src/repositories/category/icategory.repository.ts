import { IBaseRepository } from 'src/domain/base';
import { UpdateCategoryInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';

export abstract class ICategoryRepository extends IBaseRepository<
  string,
  CategoryEntity,
  UpdateCategoryInput
> {
  abstract findByName(names: string): Promise<CategoryEntity>;
}
