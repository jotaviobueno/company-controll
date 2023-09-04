import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AddressEntity } from 'src/domain/entities';
import { IAddressRepository } from 'src/repositories/address';

@Injectable()
export class AddressFindOneUseCase
  implements IBaseUseCase<string, AddressEntity>
{
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(data: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findById(data);

    if (!address)
      throw new HttpException('address not found', HttpStatus.NOT_FOUND);

    return address;
  }
}
