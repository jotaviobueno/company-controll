import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAccessInput } from 'src/domain/dtos';
import { AccessEntity } from 'src/domain/entities';
import { IAccessRepository } from 'src/repositories/access';

@Injectable()
export class AccessFindByCodeOrUpdateUseCase
  implements IBaseUseCase<CreateAccessInput, AccessEntity>
{
  constructor(private readonly accessRepository: IAccessRepository) {}

  async execute(data: CreateAccessInput): Promise<AccessEntity> {
    const access = await this.accessRepository.findByToken(data.token);

    if (access)
      await this.accessRepository.update({
        id: access.id,
      });

    return access;
  }
}
