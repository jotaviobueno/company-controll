import { Test, TestingModule } from '@nestjs/testing';
import { PersonResolver } from './person.resolver';
import { accessModuleMock } from '../access/access.module';

describe('PersonResolver', () => {
  let resolver: PersonResolver;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(accessModuleMock).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
