import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PersonCreateUseCase } from './person-create.use-case';
import { personModuleMock } from '../../person.module';
import { createPersonInputMock, personMock } from 'src/domain/mocks';

describe('PersonCreateUseCase', () => {
  let usecase: PersonCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonCreateUseCase>(PersonCreateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should create', async () => {
    const createSpy = jest
      .spyOn(prismaService.person, 'create')
      .mockResolvedValue(personMock);

    const response = await usecase.execute(createPersonInputMock);

    expect(response).toStrictEqual(personMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createPersonInputMock,
        deletedAt: null,
      },
    });
  });
});
