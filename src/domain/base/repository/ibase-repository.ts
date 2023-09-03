export abstract class IBaseRepository<T, K> {
  abstract create(createDto: T): Promise<K>;
  abstract createMany(createDto: T[]): Promise<any>;
  abstract findById(id: string): Promise<K>;
  //abstract findManyWithId(id: string): Promise<K>;
  abstract findAll(paginationOptionsInput: T): Promise<K>;
  abstract update(updateDto: T): Promise<K>;
  abstract softDelete(id: string): Promise<K>;
  abstract delete(id: string): Promise<K>;
}
