import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { IAddressRepository } from 'src/repositories/address';
import { AddressFindOneUseCase } from '../find-one';

@Injectable()
export class AddressSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly addressFindOneUseCase: AddressFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const address = await this.addressFindOneUseCase.execute(data);

    const remove = await this.addressRepository.softDelete(address.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
