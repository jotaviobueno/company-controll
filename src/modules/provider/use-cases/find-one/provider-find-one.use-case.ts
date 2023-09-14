import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ProviderEntity } from 'src/domain/entities';
import { IProviderRepository } from 'src/repositories/provider';

@Injectable()
export class ProviderFindOneUseCase
  implements IBaseUseCase<string, ProviderEntity>
{
  constructor(private readonly providerRepository: IProviderRepository) {}

  async execute(data: string): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findById(data);

    if (!provider)
      throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);

    return provider;
  }
}
