import { ObjectType } from '@nestjs/graphql';
import { CompanyProvider } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class CompanyProviderEntity
  extends IBaseEntity
  implements CompanyProvider
{
  companyId: string;

  providerId: string;

  deletedAt: Date | null;
}
