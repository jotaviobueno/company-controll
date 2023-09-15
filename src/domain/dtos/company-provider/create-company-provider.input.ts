import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCompanyProviderInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  providerId: string;
}
