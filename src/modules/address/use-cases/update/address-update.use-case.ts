import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AddressEntity } from 'src/domain/entities';
import { IAddressRepository } from 'src/repositories/address';
import { AddressFindOneUseCase } from '../find-one';
import { UpdateAddressInput } from 'src/domain/dtos';

@Injectable()
export class AddressUpdateUseCase
  implements IBaseUseCase<UpdateAddressInput, AddressEntity>
{
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly addressFindOneUseCase: AddressFindOneUseCase,
  ) {}

  async execute(data: UpdateAddressInput): Promise<AddressEntity> {
    const address = await this.addressFindOneUseCase.execute(data.id);

    const update = await this.addressRepository.update({
      id: address.id,
      ...data,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
