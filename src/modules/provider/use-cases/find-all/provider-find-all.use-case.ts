import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';
import { IProviderRepository } from 'src/repositories/provider';

@Injectable()
export class ProviderFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, ProviderEntity[]>
{
  constructor(private readonly providerRepository: IProviderRepository) {}

  execute(data: PaginationOptionsInput): Promise<ProviderEntity[]> {
    return this.providerRepository.findAll(data);
  }
}
