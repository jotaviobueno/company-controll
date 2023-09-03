import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { IPersonRepository } from 'src/repositories/person';
import { PersonFindOneUseCase } from '../find-one';

@Injectable()
export class PersonSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly personRepository: IPersonRepository,
    private readonly personFindOneUseCase: PersonFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const person = await this.personFindOneUseCase.execute(data);

    const softDelete = await this.personRepository.softDelete(person.id);

    if (!softDelete)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
