import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  number: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  zipCode: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  state: string;
}
