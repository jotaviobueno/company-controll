import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descriptions?: string;
}
