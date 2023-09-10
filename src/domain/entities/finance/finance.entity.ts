import { ObjectType } from '@nestjs/graphql';
import { Finance } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class FinanceEntity extends IBaseEntity implements Finance {
  invoiceId: string;
}
