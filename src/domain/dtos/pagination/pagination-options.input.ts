import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationOptionsInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number | null = 1;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(25)
  per_page?: number | null = 10;
}
