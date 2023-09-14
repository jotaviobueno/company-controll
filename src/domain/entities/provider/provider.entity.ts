import { Field, ObjectType } from '@nestjs/graphql';
import { Provider } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class ProviderEntity extends IBaseEntity implements Provider {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string | null;

  @Field({ nullable: true })
  cnpj: string | null;

  deletedAt: Date | null;
}
