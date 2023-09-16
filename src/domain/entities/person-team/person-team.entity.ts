import { ObjectType } from '@nestjs/graphql';
import { PersonTeam } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PersonTeamEntity extends IBaseEntity implements PersonTeam {
  personId: string;

  teamId: string;
}
