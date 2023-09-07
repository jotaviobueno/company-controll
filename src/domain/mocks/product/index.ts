import { CreateProductInput, UpdateProductInput } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';

export const productMock: ProductEntity = {
  name: 'test',
  unitPrice: 10,
  discountPercentage: 0,
  imagesUrl: ['test'],
  companyId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createProductInputMock: CreateProductInput = {
  name: 'test',
  unitPrice: 10,
  imagesUrl: ['test'],
  companyId: '1',
};

export const updateProductInputMock: UpdateProductInput = {
  id: '1',
};
