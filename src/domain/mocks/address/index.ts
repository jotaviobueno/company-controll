import { CreateAddressInput, UpdateAddressInput } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';

export const addressMock: AddressEntity = {
  street: 'test',
  number: 'test',
  neighboord: 'test',
  city: 'test',
  zipCode: 10,
  state: 'test',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createAddressInputMock: CreateAddressInput = {
  street: 'test',
  number: 'test',
  neighboord: 'test',
  city: 'test',
  zipCode: 10,
  state: 'test',
};

export const updateAddressInputMock: UpdateAddressInput = {
  street: 'test',
};
