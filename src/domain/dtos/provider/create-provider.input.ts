import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCnpj } from 'src/domain/validators';

@InputType()
export class CreateProviderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  categories?: string[];

  @Field({ nullable: true })
  @IsCnpj()
  @IsOptional()
  cnpj?: string;
}
