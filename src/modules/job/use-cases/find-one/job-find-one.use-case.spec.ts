import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { jobMock } from 'src/domain/mocks';
import { HttpException } from '@nestjs/common';
import { JobFindOneUseCase } from './job-find-one.use-case';
import { jobModuleMock } from '../../job.module';

describe('JobFindOneUseCase', () => {
  let usecase: JobFindOneUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(jobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<JobFindOneUseCase>(JobFindOneUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should findOne', async () => {
    const findOneSpy = jest
      .spyOn(prismaService.job, 'findFirst')
      .mockResolvedValue(jobMock);

    const response = await usecase.execute('1');

    expect(response).toStrictEqual(jobMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
        deletedAt: null,
      },
    });
  });

  it('Should throw an error when not found job', async () => {
    jest.spyOn(prismaService.job, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute('1')).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
