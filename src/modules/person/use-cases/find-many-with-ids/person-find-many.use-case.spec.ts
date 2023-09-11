import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { personModuleMock } from '../../person.module';
import { personMock } from 'src/domain/mocks';
import { PersonFindManyWithIdsUseCase } from './person-find-many-with-ids.use-case';

describe('PersonFindManyWithIdsUseCase', () => {
  let usecase: PersonFindManyWithIdsUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonFindManyWithIdsUseCase>(
      PersonFindManyWithIdsUseCase,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findAll', async () => {
    const findAllSpy = jest
      .spyOn(prismaService.person, 'findMany')
      .mockResolvedValue([personMock]);

    const response = await usecase.execute(['1']);

    expect(response).toStrictEqual([personMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['1'],
        },
      },
    });
  });
});
