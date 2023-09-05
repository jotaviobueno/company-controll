import {
  CreateCompanyAddressInput,
  UpdateCompanyAddressInput,
} from 'src/domain/dtos';
import { CompanyAddressEntity } from 'src/domain/entities';

export const companyAddressMock: CompanyAddressEntity = {
  companyId: '1',
  addressId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createCompanyAddressInputMock: CreateCompanyAddressInput = {
  companyId: '1',
  addressId: '1',
};

export const updateCompanyAddressInputMock: UpdateCompanyAddressInput = {
  id: '1',
};
