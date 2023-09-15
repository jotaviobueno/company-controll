import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProviderEntity } from 'src/domain/entities';
import { IProviderRepository } from 'src/repositories/provider';

@Injectable()
export class ProviderFindManyWithIdsUseCase
  implements IBaseUseCase<string[], ProviderEntity[]>
{
  constructor(private readonly providerRepository: IProviderRepository) {}

  execute(data: string[]): Promise<ProviderEntity[]> {
    return this.providerRepository.findManyWithIds(data);
  }
}
