import { CreateTeamInput, UpdateTeamInput } from 'src/domain/dtos';
import { TeamEntity } from 'src/domain/entities';

export const createTeamInputMock: CreateTeamInput = {
  name: 'test',
  companyId: '1',
  imagesUrls: [],
};

export const teamMock: TeamEntity = {
  name: 'test',
  description: 'test',
  companyId: '1',
  imagesUrls: [],
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const updateTeamInputMock: UpdateTeamInput = { id: '1' };
