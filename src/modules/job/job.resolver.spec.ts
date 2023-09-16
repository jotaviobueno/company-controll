import { Test, TestingModule } from '@nestjs/testing';
import { jobModuleMock } from './job.module';
import { JobResolver } from './job.resolver';
import {
  JobCreateUseCase,
  JobFindAllUseCase,
  JobFindOneUseCase,
  JobSoftDeleteUseCase,
  JobUpdateUseCase,
} from './use-cases';
import {
  createJobInputMock,
  jobMock,
  paginationOptionsInputMock,
  updateJobInputMock,
} from 'src/domain/mocks';

describe('JobResolver', () => {
  let resolver: JobResolver;
  let moduleRef: TestingModule;

  let createUseCase: JobCreateUseCase;
  let findAllUseCase: JobFindAllUseCase;
  let findOneUseCase: JobFindOneUseCase;
  let softDeleteUseCase: JobSoftDeleteUseCase;
  let updateUseCase: JobUpdateUseCase;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(jobModuleMock).compile();

    resolver = moduleRef.get<JobResolver>(JobResolver);

    createUseCase = moduleRef.get<JobCreateUseCase>(JobCreateUseCase);
    findAllUseCase = moduleRef.get<JobFindAllUseCase>(JobFindAllUseCase);
    findOneUseCase = moduleRef.get<JobFindOneUseCase>(JobFindOneUseCase);
    softDeleteUseCase =
      moduleRef.get<JobSoftDeleteUseCase>(JobSoftDeleteUseCase);
    updateUseCase = moduleRef.get<JobUpdateUseCase>(JobUpdateUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should create', async () => {
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(jobMock);

    expect(await resolver.createJob(createJobInputMock)).toStrictEqual(jobMock);
  });

  it('should findAll', async () => {
    jest.spyOn(findAllUseCase, 'execute').mockResolvedValue([jobMock]);

    expect(await resolver.findAllJob(paginationOptionsInputMock)).toStrictEqual(
      [jobMock],
    );
  });

  it('should findOne', async () => {
    jest.spyOn(findOneUseCase, 'execute').mockResolvedValue(jobMock);

    expect(await resolver.findOneJob({ id: '1' })).toStrictEqual(jobMock);
  });

  it('should update', async () => {
    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(jobMock);

    expect(await resolver.updateJob(updateJobInputMock)).toStrictEqual(jobMock);
  });

  it('should remove', async () => {
    jest.spyOn(softDeleteUseCase, 'execute').mockResolvedValue(true);

    expect(await resolver.removeJob({ id: '1' })).toStrictEqual(true);
  });
});
