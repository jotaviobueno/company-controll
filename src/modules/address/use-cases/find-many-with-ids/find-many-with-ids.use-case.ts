import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AddressEntity } from 'src/domain/entities';
import { IAddressRepository } from 'src/repositories/address';

@Injectable()
export class AddressFindManyWithIdsUseCase
  implements IBaseUseCase<string[], AddressEntity[]>
{
  constructor(private readonly addressRepository: IAddressRepository) {}

  execute(data: string[]): Promise<AddressEntity[]> {
    return this.addressRepository.findManyWithIds(data);
  }
}
