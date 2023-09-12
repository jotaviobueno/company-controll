import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { IProviderRepository } from 'src/repositories/provider';
import { ProviderFindOneUseCase } from '../find-one';

@Injectable()
export class ProviderSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly providerRepository: IProviderRepository,
    private readonly providerFindOneUseCase: ProviderFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const provider = await this.providerFindOneUseCase.execute(data);

    const remove = await this.providerRepository.softDelete(provider.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
