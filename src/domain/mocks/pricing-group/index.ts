import {
  CreatePricingGroupInput,
  UpdatePricingGroupInput,
} from 'src/domain/dtos';
import { PricingGroupEntity } from 'src/domain/entities';

export const pricingGroupMock: PricingGroupEntity = {
  name: 'test',
  deletedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createPricingGroupInputMock: CreatePricingGroupInput = {
  name: 'test',
};

export const updatePricingGroupInputMock: UpdatePricingGroupInput = {
  id: '1',
};
