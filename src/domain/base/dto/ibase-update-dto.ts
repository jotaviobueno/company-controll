import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class IBaseUpdateDto {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
