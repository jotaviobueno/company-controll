import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, PersonEntity[]>
{
  constructor(private readonly personRepository: IPersonRepository) {}

  execute(data: PaginationOptionsInput): Promise<PersonEntity[]> {
    return this.personRepository.findAll(data);
  }
}
