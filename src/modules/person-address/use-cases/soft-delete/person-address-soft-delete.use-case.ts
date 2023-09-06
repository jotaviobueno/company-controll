import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AddressSoftDeleteUseCase } from 'src/modules/address/use-cases/soft-delete';
import { IPersonAddressRepository } from 'src/repositories/person-address';
import { PersonAddressFindOneUseCase } from '../find-one';

@Injectable()
export class PersonAddressSoftDeleteUseCase
  implements IBaseUseCase<string, boolean>
{
  constructor(
    private readonly personAddressFindOneUseCase: PersonAddressFindOneUseCase,
    private readonly addressSoftDeleteUseCase: AddressSoftDeleteUseCase,
    private readonly personAddressRepository: IPersonAddressRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const companyAddres = await this.personAddressFindOneUseCase.execute(data);

    await this.addressSoftDeleteUseCase.execute(companyAddres.addressId);

    const remove = await this.personAddressRepository.softDelete(
      companyAddres.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
