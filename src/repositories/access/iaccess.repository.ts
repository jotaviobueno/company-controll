import { AccessEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IAccessRepository extends RepositoryFactory<AccessEntity> {
  constructor() {
    super('access');
  }

  //abstract create(
  //  createDto: Omit<CreateAccessInput, 'code'>,
  //): Promise<AccessEntity>;
  abstract findByToken(token: string): Promise<AccessEntity>;
}
