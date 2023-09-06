import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCnpj } from 'src/domain/validators';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsCnpj()
  cnpj: string;

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
