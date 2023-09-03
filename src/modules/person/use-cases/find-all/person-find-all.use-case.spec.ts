import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PersonFindAllUseCase } from './person-find-all.use-case';
import { personModuleMock } from '../../person.module';
import { paginationOptionsInputMock, personMock } from 'src/domain/mocks';

describe('PersonFindAllUseCase', () => {
  let usecase: PersonFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonFindAllUseCase>(PersonFindAllUseCase);
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

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([personMock]);
    expect(findAllSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      skip:
        (paginationOptionsInputMock.page - 1) *
        paginationOptionsInputMock.per_page,
      take: paginationOptionsInputMock.per_page,
    });
  });
});
