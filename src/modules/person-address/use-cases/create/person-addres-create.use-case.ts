import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAddressInput } from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';
import { AddressCreateUseCase } from 'src/modules/address/use-cases';
import { PersonFindOneUseCase } from 'src/modules/person/use-cases';
import { IPersonAddressRepository } from 'src/repositories/person-address';

@Injectable()
export class PersonAddressCreateUseCase
  implements
    IBaseUseCase<
      CreateAddressInput & {
        personId: string;
      },
      PersonAddressEntity
    >
{
  constructor(
    private readonly personFindOneUseCase: PersonFindOneUseCase,
    private readonly addressCreateUseCase: AddressCreateUseCase,
    private readonly personAddressRepository: IPersonAddressRepository,
  ) {}

  async execute({
    personId,
    ...createAddressInput
  }: CreateAddressInput & { personId: string }): Promise<PersonAddressEntity> {
    const person = await this.personFindOneUseCase.execute(personId);

    const address = await this.addressCreateUseCase.execute(createAddressInput);

    const personAddress = await this.personAddressRepository.create({
      addressId: address.id,
      personId: person.id,
    });

    return personAddress;
  }
}
