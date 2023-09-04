import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCompanyAddressInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  addressId: string;
}
