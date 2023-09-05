import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { RoleEntity } from 'src/domain/entities';
import { IRoleRepository } from 'src/repositories/role';

@Injectable()
export class RoleFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, RoleEntity[]>
{
  constructor(private readonly roleRepository: IRoleRepository) {}

  execute(data: PaginationOptionsInput): Promise<RoleEntity[]> {
    return this.roleRepository.findAll(data);
  }
}
