import { CustomerCompanyInput } from 'src/domain/dtos';
import { CustomerCompanyEntity } from 'src/domain/entities';

export const customerCompanyMock: CustomerCompanyEntity = {
  companyId: '1',
  customerId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const customerCompanyInputMock: CustomerCompanyInput = {
  companyId: '1',
  customerId: '1',
};
