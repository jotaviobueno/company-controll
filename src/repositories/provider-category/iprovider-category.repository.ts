import { IBaseRepository } from 'src/domain/base';
import { CreateProviderCategoryDto } from 'src/domain/dtos/provider-category';
import { ProviderCategoryEntity } from 'src/domain/entities';

export abstract class IProviderCategoryRepository extends IBaseRepository<
  CreateProviderCategoryDto,
  ProviderCategoryEntity
> {}
