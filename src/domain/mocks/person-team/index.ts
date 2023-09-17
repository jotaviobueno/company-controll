import { CreatePersonTeamInput } from 'src/domain/dtos';
import { PersonTeamEntity } from 'src/domain/entities';

export const personTeamMock: PersonTeamEntity = {
  personId: '1',
  teamId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createPersonTeamInputMock: CreatePersonTeamInput = {
  personId: '1',
  teamId: '1',
};
