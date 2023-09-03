import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonFindOneUseCase
  implements IBaseUseCase<string, PersonEntity>
{
  constructor(private readonly personRepository: IPersonRepository) {}

  async execute(data: string): Promise<PersonEntity> {
    const person = await this.personRepository.findById(data);

    if (!person)
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);

    return person;
  }
}
