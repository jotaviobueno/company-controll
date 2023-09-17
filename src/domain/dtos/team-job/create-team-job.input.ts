import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTeamJobInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  teamId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  jobId: string;
}
