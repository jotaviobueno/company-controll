import {
  CreateCustomerAddressInput,
  UpdateCustomerAddressInput,
} from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';

export const customerAddressMock: CustomerAddressEntity = {
  customerId: '1',
  addressId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createCustomerAddressInputMock: CreateCustomerAddressInput = {
  customerId: '1',
  addressId: '1',
};

export const updateCustomerAddressInputMock: UpdateCustomerAddressInput = {
  id: '1',
};
