import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateProviderInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';
import { IProviderRepository } from 'src/repositories/provider';
import { ProviderFindOneUseCase } from '../find-one';

@Injectable()
export class ProviderUpdateUseCase
  implements IBaseUseCase<UpdateProviderInput, ProviderEntity>
{
  constructor(
    private readonly providerRepository: IProviderRepository,
    private readonly providerFindOneUseCase: ProviderFindOneUseCase,
  ) {}

  async execute(data: UpdateProviderInput): Promise<ProviderEntity> {
    const provider = await this.providerFindOneUseCase.execute(data.id);

    const update = await this.providerRepository.update({
      id: provider.id,
      ...data,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
