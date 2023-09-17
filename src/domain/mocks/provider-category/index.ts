import { CreateProviderCategoryDto } from 'src/domain/dtos/provider-category';
import { ProviderCategoryEntity } from 'src/domain/entities';

export const providerCategoryMock: ProviderCategoryEntity = {
  providerId: '1',
  categoryId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createProviderCategoryInputMock: CreateProviderCategoryDto = {
  providerId: '1',
  categoryId: '1',
};
