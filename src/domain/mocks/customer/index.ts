import { CreateCustomerInput, UpdateCustomerInput } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';

export const customerMock: CustomerEntity = {
  name: 'test',
  cpf: '123',
  email: 'test@exemple.com',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createCustomerInputMock: CreateCustomerInput = {
  name: 'test',
  cpf: '123',
  email: 'test@exemple.com',
};

export const updateCustomerInputMock: UpdateCustomerInput = {
  id: '1',
};
