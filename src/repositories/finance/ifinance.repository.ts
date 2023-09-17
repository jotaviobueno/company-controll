import { FinanceEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IFinanceRepository extends RepositoryFactory<FinanceEntity> {
  constructor() {
    super('finance');
  }
}
