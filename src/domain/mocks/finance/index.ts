import { CreateFinanceInput } from 'src/domain/dtos';
import { FinanceEntity } from 'src/domain/entities';

export const financeMock: FinanceEntity = {
  invoiceId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const createFinanceInputMock: CreateFinanceInput = {
  invoiceId: '1',
};
