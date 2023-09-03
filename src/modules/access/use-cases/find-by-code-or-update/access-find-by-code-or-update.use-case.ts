import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AccessEntity } from 'src/domain/entities';
import { IAccessRepository } from 'src/repositories/access';

@Injectable()
export class AccessFindByCodeOrUpdateUseCase
  implements IBaseUseCase<string, AccessEntity>
{
  constructor(private readonly accessRepository: IAccessRepository) {}

  async execute(data: string): Promise<AccessEntity> {
    const access = await this.accessRepository.findByToken(data);

    if (access)
      await this.accessRepository.update({
        id: access.id,
      });

    return access;
  }
}
