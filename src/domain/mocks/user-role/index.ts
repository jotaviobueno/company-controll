import { PersonRoleInput } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';

export const personRoleMock: PersonRoleEntity = {
  roleId: '1',
  personId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const personRoleInputMock: PersonRoleInput = {
  personId: '1',
  roleId: '1',
};
