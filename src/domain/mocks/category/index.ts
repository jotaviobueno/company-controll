import { UpdateCategoryInput } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';

export const updateCategoryInputMock: UpdateCategoryInput = { id: '1' };

export const categoryMock: CategoryEntity = {
  name: 'test',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};
