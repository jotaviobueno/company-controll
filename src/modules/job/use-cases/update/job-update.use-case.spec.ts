import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { HttpException } from '@nestjs/common';
import { jobMock, updateJobInputMock } from 'src/domain/mocks';
import { JobUpdateUseCase } from './job-update.use-case';
import { jobModuleMock } from '../../job.module';

describe('JobUpdateUseCase', () => {
  let usecase: JobUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(jobModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<JobUpdateUseCase>(JobUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.job, 'findFirst').mockResolvedValue(jobMock);

    const updateSpy = jest
      .spyOn(prismaService.job, 'update')
      .mockResolvedValue(jobMock);

    const response = await usecase.execute(updateJobInputMock);

    expect(response).toStrictEqual(jobMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        updatedAt: expect.any(Date),
      },
    });
  });

  it('Should throw an error when failed to update', async () => {
    jest.spyOn(prismaService.job, 'findFirst').mockResolvedValue(jobMock);

    jest.spyOn(prismaService.job, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updateJobInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
