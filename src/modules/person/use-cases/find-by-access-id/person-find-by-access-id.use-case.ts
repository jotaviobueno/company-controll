import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonFindByAccessIdUseCase
  implements IBaseUseCase<string, PersonEntity>
{
  constructor(private readonly personRepository: IPersonRepository) {}

  async execute(data: string): Promise<PersonEntity> {
    const person = await this.personRepository.findByAccessId(data);

    if (!person)
      throw new HttpException('person not found', HttpStatus.NOT_FOUND);

    return person;
  }
}
