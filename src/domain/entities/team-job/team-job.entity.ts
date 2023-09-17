import { ObjectType } from '@nestjs/graphql';
import { TeamJob } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class TeamJobEntity extends IBaseEntity implements TeamJob {
  teamId: string;

  jobId: string;

  deletedAt: Date | null;
}
