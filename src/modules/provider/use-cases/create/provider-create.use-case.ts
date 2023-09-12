import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateProviderInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';
import { IProviderRepository } from 'src/repositories/provider';

@Injectable()
export class ProdiverCreateUseCase
  implements IBaseUseCase<CreateProviderInput, ProviderEntity>
{
  constructor(private readonly providerRepository: IProviderRepository) {}

  execute(data: CreateProviderInput): Promise<ProviderEntity> {
    return this.providerRepository.create(data);
  }
}
