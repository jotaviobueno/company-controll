export abstract class IBaseUseCase<T, K, Y = void> {
  abstract execute(data: T, value?: Y): Promise<K>;
}
