import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProviderCategoryDto } from 'src/domain/dtos/provider-category';
import { CreateManyEntity } from 'src/domain/entities';
import { IProviderCategoryRepository } from 'src/repositories/provider-category';

@Injectable()
export class ProviderCategoryCreateManyUseCase
  implements IBaseUseCase<CreateProviderCategoryDto[], CreateManyEntity>
{
  constructor(
    private readonly providerCategoryRepository: IProviderCategoryRepository,
  ) {}

  execute(data: CreateProviderCategoryDto[]): Promise<CreateManyEntity> {
    return this.providerCategoryRepository.createMany(data);
  }
}
