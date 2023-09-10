import { IBaseRepository } from 'src/domain/base';
import { CreateFinanceInput } from 'src/domain/dtos';
import { FinanceEntity } from 'src/domain/entities';

export abstract class IFinanceRepository extends IBaseRepository<
  CreateFinanceInput,
  FinanceEntity
> {}
