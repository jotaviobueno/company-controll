import { CreateJobInput, UpdateJobInput } from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';
import { JOB_STATUS } from 'src/domain/enums';

export const jobMock: JobEntity = {
  title: 'test',
  description: 'test',
  status: 'PENDING',
  expiresAt: null,
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const updateJobInputMock: UpdateJobInput = {
  id: '1',
};

export const createJobInputMock: CreateJobInput = {
  title: 'test',
  description: 'test',
  status: JOB_STATUS.PENDING,
};
