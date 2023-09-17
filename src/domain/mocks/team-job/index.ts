import { CreateTeamJobInput } from 'src/domain/dtos';
import { TeamJobEntity } from 'src/domain/entities';

export const teamJobMock: TeamJobEntity = {
  teamId: '1',
  jobId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createTeamJobInputMock: CreateTeamJobInput = {
  teamId: '1',
  jobId: '1',
};
