import { UpdateRoleInput } from 'src/domain/dtos';
import { RoleEntity } from 'src/domain/entities';

export const roleMock: RoleEntity = {
  name: 'ADMIN',
  description: 'TEST',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const updateRoleInputMock: UpdateRoleInput = {
  descriptions: 'test',
};
