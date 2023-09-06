import { Field, ObjectType } from '@nestjs/graphql';
import { Company } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CompanyEntity extends IBaseEntity implements Company {
  @Field()
  cnpj: string;

  @Field()
  corporateName: string;

  @Field()
  status: string;

  @Field()
  sector: string | null;

  deletedAt: Date | null;
}
