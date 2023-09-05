import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  cnpj: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  corporateName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sector: string;
}
