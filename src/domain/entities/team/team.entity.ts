import { ObjectType, Field } from '@nestjs/graphql';
import { Team } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class TeamEntity extends IBaseEntity implements Team {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string | null;

  companyId: string;

  @Field(() => [String])
  imagesUrls: string[];

  deletedAt: Date | null;
}
