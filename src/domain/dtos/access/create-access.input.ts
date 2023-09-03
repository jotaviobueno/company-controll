import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ACCESS_PROVIDER } from 'src/domain/enums';

@InputType()
export class CreateAccessInput {
  @Field(() => ACCESS_PROVIDER)
  @IsString()
  @IsNotEmpty()
  provider: ACCESS_PROVIDER;

  @Field()
  @IsString()
  @IsNotEmpty()
  code?: string;

  token: string;
}
