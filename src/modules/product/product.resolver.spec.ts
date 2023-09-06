import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { productModuleMock } from './product.module';
import {
  ProductCreateUseCase,
  ProductFindAllUseCase,
  ProductFindOneUseCase,
  ProductSoftDeleteUseCase,
  ProductUpdateUseCase,
} from './use-cases';
import {
  createProductInputMock,
  paginationOptionsInputMock,
  productMock,
  updateProductInputMock,
} from 'src/domain/mocks';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  let createUseCase: ProductCreateUseCase;
  let findAllUseCase: ProductFindAllUseCase;
  let findOneUseCase: ProductFindOneUseCase;
  let updateUseCase: ProductUpdateUseCase;
  let softDeleteUseCase: ProductSoftDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(productModuleMock).compile();

    resolver = module.get<ProductResolver>(ProductResolver);

    createUseCase = module.get<ProductCreateUseCase>(ProductCreateUseCase);
    findAllUseCase = module.get<ProductFindAllUseCase>(ProductFindAllUseCase);
    findOneUseCase = module.get<ProductFindOneUseCase>(ProductFindOneUseCase);
    updateUseCase = module.get<ProductUpdateUseCase>(ProductUpdateUseCase);
    softDeleteUseCase = module.get<ProductSoftDeleteUseCase>(
      ProductSoftDeleteUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(productMock);

    expect(await resolver.createProduct(createProductInputMock)).toStrictEqual(
      productMock,
    );
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([productMock]);

    expect(
      await resolver.findAllProduct(paginationOptionsInputMock),
    ).toStrictEqual([productMock]);
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(productMock);

    expect(await resolver.findOneProduct({ id: '1' })).toStrictEqual(
      productMock,
    );
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(productMock);

    expect(await resolver.updateProduct(updateProductInputMock)).toStrictEqual(
      productMock,
    );
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeProduct({ id: '1' })).toStrictEqual(true);
  });
});
