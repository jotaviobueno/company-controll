import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAddressInput } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';
import { IAddressRepository } from 'src/repositories/address/iaddress.repository';

@Injectable()
export class AddressCreateUseCase
  implements IBaseUseCase<CreateAddressInput, AddressEntity>
{
  constructor(private readonly addressRepository: IAddressRepository) {}

  execute(data: CreateAddressInput): Promise<AddressEntity> {
    return this.addressRepository.create(data);
  }
}
