import { CreateStockInput, UpdateStockInput } from 'src/domain/dtos';
import { StockEntity } from 'src/domain/entities';
import { STOCK_TYPE_STATUS } from 'src/domain/enums';

export const stockMock: StockEntity = {
  type: 'INCOME',
  description: 'test',
  provider: 'test',
  quantity: 10,
  productId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createStockInputMock: CreateStockInput = {
  type: STOCK_TYPE_STATUS.INCOME,
  quantity: 10,
  productId: '1',
};

export const updateStockInputMock: UpdateStockInput = {
  id: '1',
};
