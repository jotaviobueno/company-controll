import { PaginationOptionsInput } from 'src/domain/dtos';

export abstract class IBaseRepository<T, K, I = never> {
  abstract create(createDto: T): Promise<K>;
  abstract createMany(createDto: T[]): Promise<any>;
  abstract findById(id: string): Promise<K>;
  //abstract findManyWithId(id: string): Promise<K>;
  abstract findAll(
    paginationOptionsInput: PaginationOptionsInput,
  ): Promise<K[]>;
  abstract update(updateDto: I): Promise<K>;
  abstract softDelete(id: string): Promise<K>;
  abstract delete(id: string): Promise<K>;
}
