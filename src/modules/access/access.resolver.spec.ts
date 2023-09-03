import { Test, TestingModule } from '@nestjs/testing';
import { AccessResolver } from './access.resolver';
import { AccessService } from './access.service';

describe('AccessResolver', () => {
  let resolver: AccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessResolver, AccessService],
    }).compile();

    resolver = module.get<AccessResolver>(AccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
