import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

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
}
