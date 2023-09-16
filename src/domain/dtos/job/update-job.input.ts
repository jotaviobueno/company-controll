import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateJobInput } from './create-job.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id?: string;
}
