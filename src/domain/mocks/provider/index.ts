import { CreateProviderInput, UpdateProviderInput } from 'src/domain/dtos';
import { ProviderEntity } from 'src/domain/entities';

export const createProviderInputMock: CreateProviderInput = {
  name: 'test',
};

export const updateProviderInputMock: UpdateProviderInput = {
  id: '1',
};

export const providerMock: ProviderEntity = {
  name: 'test',
  description: 'test',
  cnpj: 'test',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};
