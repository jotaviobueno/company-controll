import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { RoleEntity } from 'src/domain/entities';
import { IRoleRepository } from 'src/repositories/role';

@Injectable()
export class RoleFindOneUseCase implements IBaseUseCase<string, RoleEntity> {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(data: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findById(data);

    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    return role;
  }
}
