import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

@InputType()
export class CreateTeamRequestInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  personId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  teamId: string;

  status: TEAM_REQUEST_STATUS | TEAM_REQUEST_STATUS.PENDING;
}
