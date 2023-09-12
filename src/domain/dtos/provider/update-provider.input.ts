import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProviderInput } from './create-provider.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProviderInput extends PartialType(CreateProviderInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  id?: string;
}
