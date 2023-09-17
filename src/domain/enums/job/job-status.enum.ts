import { registerEnumType } from '@nestjs/graphql';

export enum JOB_STATUS {
  TERMINATED = 'TERMINATED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}

registerEnumType(JOB_STATUS, {
  name: 'JobStatus',
});
