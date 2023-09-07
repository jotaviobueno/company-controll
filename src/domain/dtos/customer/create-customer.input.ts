import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  cpf?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsMongoId()
  @IsNotEmpty()
  @Field()
  companyId: string;
}
