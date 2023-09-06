import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';
import { IPersonAddressRepository } from 'src/repositories/person-address';

@Injectable()
export class PersonAddressFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, PersonAddressEntity[]>
{
  constructor(
    private readonly personAddressRepository: IPersonAddressRepository,
  ) {}

  execute(data: PaginationOptionsInput): Promise<PersonAddressEntity[]> {
    return this.personAddressRepository.findAll(data);
  }
}
