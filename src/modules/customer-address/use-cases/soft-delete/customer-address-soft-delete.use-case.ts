import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerAddressFindOneUseCase } from '../find-one';
import { AddressSoftDeleteUseCase } from 'src/modules/address/use-cases/soft-delete';
import { ICustomerAddressRepostiroy } from 'src/repositories/customer-address';

@Injectable()
export class CustomerAddressSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly customerAddressRepository: ICustomerAddressRepostiroy,
    private readonly addressSoftDeleteUseCase: AddressSoftDeleteUseCase,
    private readonly customerAddressFindOneUseCase: CustomerAddressFindOneUseCase,
  ) {}

  async execute(data: string): Promise<boolean> {
    const customerAddres =
      await this.customerAddressFindOneUseCase.execute(data);

    await this.addressSoftDeleteUseCase.execute(customerAddres.addressId);

    const remove = await this.customerAddressRepository.softDelete(
      customerAddres.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
