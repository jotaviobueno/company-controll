import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonRoleEntity } from 'src/domain/entities';
import { IPersonRoleRepository } from 'src/repositories/person-role';

@Injectable()
export class PersonRoleFindManyWithPersonIdUseCase
  implements IBaseUseCase<string[], PersonRoleEntity[]>
{
  constructor(private readonly personRoleRepository: IPersonRoleRepository) {}

  execute(data: string[]): Promise<PersonRoleEntity[]> {
    return this.personRoleRepository.findManyWithPersonId(data);
  }
}
