import { ObjectType } from '@nestjs/graphql';
import { ProviderCategory } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class ProviderCategoryEntity
  extends IBaseEntity
  implements ProviderCategory
{
  providerId: string;

  categoryId: string;
}
