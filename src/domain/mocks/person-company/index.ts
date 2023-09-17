import { PersonCompanyInput } from 'src/domain/dtos';
import { PersonCompanyEntity } from 'src/domain/entities';

export const personCompanyMock: PersonCompanyEntity = {
  personId: '1',
  companyId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

export const personCompanyInputMock: PersonCompanyInput = {
  personId: '1',
  companyId: '1',
};
