import { CreateTeamRequestInput } from 'src/domain/dtos';
import { UpdateTeamRequestInput } from 'src/domain/dtos/team-request/update-team-request.input';
import { TeamRequestEntity } from 'src/domain/entities';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

export const teamRequestMock: TeamRequestEntity = {
  teamId: '1',
  personId: '1',
  status: 'PENDING',
  refusedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createTeamRequestInputMock: CreateTeamRequestInput = {
  personId: '1',
  teamId: '1',
  status: TEAM_REQUEST_STATUS.PENDING,
};

export const updateTeamRequestInputMock: UpdateTeamRequestInput = { id: '1' };
