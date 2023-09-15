import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonFindManyWithIdsUseCase
  implements IBaseUseCase<string[], PersonEntity[]>
{
  constructor(private readonly personRepository: IPersonRepository) {}

  execute(data: string[]): Promise<PersonEntity[]> {
    return this.personRepository.findManyWithIds(data);
  }
}
