import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CustomerEntity extends IBaseEntity implements Customer {
  @Field()
  name: string;

  @Field({ nullable: true })
  cpf: string | null;

  @Field({ nullable: true })
  email: string | null;

  companyId: string;

  deletedAt: Date | null;
}
