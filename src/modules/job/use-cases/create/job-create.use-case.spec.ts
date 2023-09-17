import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { createJobInputMock, jobMock } from 'src/domain/mocks';
import { JobCreateUseCase } from './job-create.use-case';
import { jobModuleMock } from '../../job.module';

describe('JobCreateUseCase', () => {
  let usecase: JobCreateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(jobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<JobCreateUseCase>(JobCreateUseCase);
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
      .spyOn(prismaService.job, 'create')
      .mockResolvedValue(jobMock);

    const response = await usecase.execute(createJobInputMock);

    expect(response).toStrictEqual(jobMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...createJobInputMock,
        deletedAt: null,
      },
    });
  });
});
