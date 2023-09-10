export abstract class IBaseUseCaseNonePromise<T, K> {
  abstract execute(data: T): K;
}
