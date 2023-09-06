import { IBaseUseCase } from 'src/domain/base';
import { UpdatePersonAddressInput } from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';
import { AddressUpdateUseCase } from 'src/modules/address/use-cases';
import { Injectable } from '@nestjs/common';
import { PersonAddressFindOneUseCase } from '../find-one';

@Injectable()
export class PersonAddressUpdateUseCase
  implements IBaseUseCase<UpdatePersonAddressInput, PersonAddressEntity>
{
  constructor(
    private readonly personAddressFindOneUseCase: PersonAddressFindOneUseCase,
    private readonly addressUpdateUseCase: AddressUpdateUseCase,
  ) {}

  async execute({
    id,
    ...updateAddressInput
  }: UpdatePersonAddressInput): Promise<PersonAddressEntity> {
    const companyAddress = await this.personAddressFindOneUseCase.execute(id);

    await this.addressUpdateUseCase.execute({
      id: companyAddress.addressId,
      ...updateAddressInput,
    });

    return companyAddress;
  }
}
