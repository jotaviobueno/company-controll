import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { UpdateAccessInput } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { IPersonRepository } from 'src/repositories/person';
import { PersonFindOneUseCase } from '../find-one';

@Injectable()
export class PersonUpdateUseCase
  implements IBaseUseCase<UpdateAccessInput, PersonEntity>
{
  constructor(
    private readonly personRepository: IPersonRepository,
    private readonly personFindOneUseCase: PersonFindOneUseCase,
  ) {}

  async execute(data: UpdateAccessInput): Promise<PersonEntity> {
    const person = await this.personFindOneUseCase.execute(data.id);

    const update = await this.personRepository.update({
      id: person.id,
      ...data,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
