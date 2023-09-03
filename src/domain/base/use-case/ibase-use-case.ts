export abstract class IBaseUseCase<T, K> {
  abstract execute(data: T): Promise<K>;
}
