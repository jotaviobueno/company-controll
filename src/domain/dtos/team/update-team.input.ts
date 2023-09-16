import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateTeamInput } from './create-team.input';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTeamInput extends OmitType(PartialType(CreateTeamInput), [
  'companyId',
]) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
