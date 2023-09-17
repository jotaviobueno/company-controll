import { CategoryEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class ICategoryRepository extends RepositoryFactory<CategoryEntity> {
  constructor() {
    super('category');
  }

  abstract findByName(names: string): Promise<CategoryEntity>;
}
