import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JOB_STATUS } from 'src/domain/enums';

@InputType()
export class CreateJobInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field(() => JOB_STATUS, { nullable: true })
  @IsString()
  @IsOptional()
  status: JOB_STATUS | JOB_STATUS.PENDING;
}
