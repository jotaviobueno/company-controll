import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProviderInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';
import { CategoryFindOrCreateUseCase } from 'src/modules/category/use-cases';
import { ProviderCategoryCreateUseCase } from 'src/modules/provider-category/use-cases';
import { IProviderRepository } from 'src/repositories/provider';

@Injectable()
// TODO: CRIAR TESTE
export class ProviderCreateUseCase
  implements IBaseUseCase<CreateProviderInput, ProviderEntity>
{
  constructor(
    private readonly providerRepository: IProviderRepository,
    private readonly categoryFindOrCreateUseCase: CategoryFindOrCreateUseCase,
    private readonly providerCategoryCreateUseCase: ProviderCategoryCreateUseCase,
  ) {}

  async execute({
    categories,
    ...data
  }: CreateProviderInput): Promise<ProviderEntity> {
    const categoriesIds =
      await this.categoryFindOrCreateUseCase.execute(categories);

    const provider = await this.providerRepository.create(data);

    const createProviderCategory = categoriesIds.map((categoryId) => ({
      categoryId,
      providerId: provider.id,
    }));

    await this.providerCategoryCreateUseCase.execute(createProviderCategory);

    return provider;
  }
}
