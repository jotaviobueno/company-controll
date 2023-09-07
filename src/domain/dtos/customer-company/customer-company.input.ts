import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CustomerCompanyInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;
}
