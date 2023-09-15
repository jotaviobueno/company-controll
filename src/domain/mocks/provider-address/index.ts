import { CreateProviderAddressInput } from 'src/domain/dtos';
import { ProviderAddressEntity } from 'src/domain/entities';

export const createProviderAddressInputMock: CreateProviderAddressInput = {
  addressId: '1',
  providerId: '1',
};

export const providerAddressMock: ProviderAddressEntity = {
  addressId: '1',
  providerId: '1',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};
