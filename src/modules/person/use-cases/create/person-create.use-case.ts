import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePersonInput } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonCreateUseCase
  implements IBaseUseCase<CreatePersonInput, PersonEntity>
{
  constructor(private readonly personRepository: IPersonRepository) {}

  execute(data: CreatePersonInput): Promise<PersonEntity> {
    return this.personRepository.create(data);
  }
}
