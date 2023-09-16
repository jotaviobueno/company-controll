import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  imagesUrls: string[];
}
