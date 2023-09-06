import {
  CreatePersonAddressInput,
  UpdatePersonAddressInput,
} from 'src/domain/dtos';
import { PersonAddressEntity } from 'src/domain/entities';

export const personAddressMock: PersonAddressEntity = {
  personId: '1',
  addressId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createPersonAddressInputMock: CreatePersonAddressInput = {
  personId: '1',
  addressId: '1',
};

export const updatePersonAddressInputMock: UpdatePersonAddressInput = {
  id: '1',
};
