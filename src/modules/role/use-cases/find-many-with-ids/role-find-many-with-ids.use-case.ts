import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { RoleEntity } from 'src/domain/entities';
import { IRoleRepository } from 'src/repositories/role';

@Injectable()
export class RoleFindManyWithIdsUseCase
  implements IBaseUseCase<string[], RoleEntity[]>
{
  constructor(private readonly roleRepository: IRoleRepository) {}

  execute(data: string[]): Promise<RoleEntity[]> {
    return this.roleRepository.findManyWithIds(data);
  }
}
