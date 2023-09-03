import { CreatePersonInput, UpdatePersonInput } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';

export const personMock: PersonEntity = {
  name: 'test',
  username: 'test',
  email: 'test',
  phone: '123',
  avatarUrl: 'test',
  accessId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createPersonInputMock: CreatePersonInput = {
  name: 'test',
  username: 'test',
  avatarUrl: 'test',
  accessId: '1',
};

export const updatePersonInputMock: UpdatePersonInput = {
  id: '1',
};
