import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PersonAddressEntity } from 'src/domain/entities';
import { IPersonAddressRepository } from 'src/repositories/person-address';

@Injectable()
export class PersonAddressFindOneUseCase
  implements IBaseUseCase<string, PersonAddressEntity>
{
  constructor(
    private readonly personAddressRepository: IPersonAddressRepository,
  ) {}

  async execute(data: string): Promise<PersonAddressEntity> {
    const personAddress = await this.personAddressRepository.findById(data);

    if (!personAddress)
      throw new HttpException('Person address not found', HttpStatus.NOT_FOUND);

    return personAddress;
  }
}
