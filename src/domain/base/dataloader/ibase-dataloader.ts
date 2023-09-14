import DataLoader = require('dataloader');

export abstract class IBaseDataloader<T, K> {
  abstract dataLoader: DataLoader<T, K[]>;

  abstract batch(data: T[]): Promise<K[][]>;

  abstract load(data: T): Promise<K[]>;
}
