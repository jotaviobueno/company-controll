import { Field, ObjectType } from '@nestjs/graphql';
import { TeamRequest, TeamRequestStatus } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

@ObjectType()
export class TeamRequestEntity extends IBaseEntity implements TeamRequest {
  teamId: string;

  personId: string;

  @Field(() => TEAM_REQUEST_STATUS)
  status: TeamRequestStatus;

  @Field(() => Date, { nullable: true })
  refusedAt: Date | null;
}
