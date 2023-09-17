import { RoleEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IRoleRepository extends RepositoryFactory<RoleEntity> {
  constructor() {
    super('role');
  }
}
