import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IBaseEntity {
  @Field()
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
