import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { jobMock, paginationOptionsInputMock } from 'src/domain/mocks';
import { jobModuleMock } from '../../job.module';
import { JobFindAllUseCase } from './job-find-all.use-case';

describe('JobFindAllUseCase', () => {
  let usecase: JobFindAllUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(jobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<JobFindAllUseCase>(JobFindAllUseCase);
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
      .spyOn(prismaService.job, 'findMany')
      .mockResolvedValue([jobMock]);

    const response = await usecase.execute(paginationOptionsInputMock);

    expect(response).toStrictEqual([jobMock]);
    expect(createSpy).toHaveBeenCalledWith({
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
