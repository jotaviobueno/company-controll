import { CreateAccessInput, UpdateAccessInput } from 'src/domain/dtos';
import { AccessEntity } from 'src/domain/entities';
import { ACCESS_PROVIDER } from 'src/domain/enums';

export const createAccessInputMock: CreateAccessInput = {
  provider: ACCESS_PROVIDER.GOOGLE,
  code: '1',
  token: '1',
};

export const accessMock: AccessEntity = {
  provider: ACCESS_PROVIDER.GOOGLE,
  token: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const updateAccessInputMock: UpdateAccessInput = {
  id: '1',
};
