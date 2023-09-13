import { CreateCompanyProviderInput } from 'src/domain/dtos';
import { CompanyProviderEntity } from 'src/domain/entities';

export const companyProviderMock: CompanyProviderEntity = {
  companyId: '1',
  providerId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createCompanyProviderInputMock: CreateCompanyProviderInput = {
  companyId: '1',
  providerId: '1',
};
