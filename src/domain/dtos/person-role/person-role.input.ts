import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class PersonRoleInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  personId: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  roleId: string;
}
