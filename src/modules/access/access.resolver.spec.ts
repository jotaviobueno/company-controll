import { Test, TestingModule } from '@nestjs/testing';
import { AccessResolver } from './access.resolver';

describe('AccessResolver', () => {
  let resolver: AccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessResolver],
    }).compile();

    resolver = module.get<AccessResolver>(AccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
