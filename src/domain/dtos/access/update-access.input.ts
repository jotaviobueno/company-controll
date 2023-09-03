import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateAccessInput } from './create-access.input';
import { IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class UpdateAccessInput extends OmitType(
  PartialType(CreateAccessInput),
  ['code', 'provider'],
) {
  @IsOptional()
  @IsMongoId()
  @Field()
  id?: string;
}
