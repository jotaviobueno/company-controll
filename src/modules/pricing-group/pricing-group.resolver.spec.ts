import { Test, TestingModule } from '@nestjs/testing';
import { PricingGroupResolver } from './pricing-group.resolver';
import { PricingGroupService } from './pricing-group.service';

describe('PricingGroupResolver', () => {
  let resolver: PricingGroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingGroupResolver, PricingGroupService],
    }).compile();

    resolver = module.get<PricingGroupResolver>(PricingGroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
