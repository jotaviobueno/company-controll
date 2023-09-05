import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/domain/entities';
import { IRoleRepository } from 'src/repositories/role';
import { RoleFindOneUseCase } from '../find-one';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateRoleInput } from 'src/domain/dtos';

@Injectable()
export class RoleUpdateUseCase
  implements IBaseUseCase<UpdateRoleInput, RoleEntity>
{
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
  ) {}

  async execute(data: UpdateRoleInput): Promise<RoleEntity> {
    const role = await this.roleFindOneUseCase.execute(data.id);

    const update = await this.roleRepository.update({ id: role.id, ...data });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
