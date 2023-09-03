import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AccessEntity } from 'src/domain/entities';
import { IAccessRepository } from 'src/repositories/access';

@Injectable()
export class AccessFindOneUseCase
  implements IBaseUseCase<string, AccessEntity>
{
  constructor(private readonly accessRepository: IAccessRepository) {}

  async execute(data: string): Promise<AccessEntity> {
    const access = await this.accessRepository.findById(data);

    if (!access)
      throw new HttpException('Access not found', HttpStatus.NOT_FOUND);

    return access;
  }
}
