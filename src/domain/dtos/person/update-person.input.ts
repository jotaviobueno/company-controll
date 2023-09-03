import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreatePersonInput } from './create-person.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdatePersonInput extends PartialType(
  OmitType(CreatePersonInput, ['accessId']),
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
