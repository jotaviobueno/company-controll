import { IBaseRepository } from 'src/domain/base';
import { CreatePersonInput, UpdatePersonInput } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';

export abstract class IPersonRepository extends IBaseRepository<
  CreatePersonInput,
  PersonEntity,
  UpdatePersonInput
> {
  abstract findByAccessId(accessId: string): Promise<PersonEntity>;
}
