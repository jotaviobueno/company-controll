import { IBaseRepository } from 'src/domain/base';
import { UpdateRoleInput } from 'src/domain/dtos';
import { RoleEntity } from 'src/domain/entities';

export abstract class IRoleRepository extends IBaseRepository<
  void,
  RoleEntity,
  UpdateRoleInput
> {}
