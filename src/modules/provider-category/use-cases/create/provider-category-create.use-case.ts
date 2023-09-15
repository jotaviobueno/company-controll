import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProviderCategoryDto } from 'src/domain/dtos/provider-category';
import { IProviderCategoryRepository } from 'src/repositories/provider-category';

@Injectable()
export class ProviderCategoryCreateUseCase
  implements IBaseUseCase<CreateProviderCategoryDto[], any>
{
  constructor(
    private readonly providerCategoryRepository: IProviderCategoryRepository,
  ) {}

  execute(data: CreateProviderCategoryDto[]): Promise<any> {
    return this.providerCategoryRepository.createMany(data);
  }
}
