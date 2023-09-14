import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CategoryEntity extends IBaseEntity implements Category {
  @Field()
  name: string;

  deletedAt: Date | null;
}
