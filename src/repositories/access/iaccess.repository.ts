import { IBaseRepository } from 'src/domain/base';
import { CreateAccessInput, UpdateAccessInput } from 'src/domain/dtos';
import { AccessEntity } from 'src/domain/entities';

export abstract class IAccessRepository extends IBaseRepository<
  CreateAccessInput,
  AccessEntity,
  UpdateAccessInput
> {
  abstract create(
    createDto: Omit<CreateAccessInput, 'code'>,
  ): Promise<AccessEntity>;
  abstract findByToken(token: string): Promise<AccessEntity>;
}
