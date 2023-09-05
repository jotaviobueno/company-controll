import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
