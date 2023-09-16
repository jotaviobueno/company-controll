import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateTeamRequestInput } from './create-team-request.input';
import { TEAM_REQUEST_STATUS } from 'src/domain/enums';

@InputType()
export class UpdateTeamRequestInput extends OmitType(
  PartialType(CreateTeamRequestInput),
  ['personId', 'teamId'],
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;

  @Field(() => TEAM_REQUEST_STATUS, { nullable: true })
  @IsOptional()
  @IsString()
  status?: TEAM_REQUEST_STATUS;
}
