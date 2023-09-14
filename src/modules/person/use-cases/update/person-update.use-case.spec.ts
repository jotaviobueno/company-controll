import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../db/prisma.service';
import { PersonUpdateUseCase } from '.';
import { HttpException } from '@nestjs/common';
import { personModuleMock } from '../../person.module';
import { personMock, updatePersonInputMock } from 'src/domain/mocks';

describe('PersonUpdateUseCase', () => {
  let usecase: PersonUpdateUseCase;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    usecase = moduleRef.get<PersonUpdateUseCase>(PersonUpdateUseCase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  afterEach(async () => {
    prismaService.$disconnect();

    await moduleRef.close();
  });

  it('should update', async () => {
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    const updateSpy = jest
      .spyOn(prismaService.person, 'update')
      .mockResolvedValue(personMock);

    const response = await usecase.execute(updatePersonInputMock);

    expect(response).toStrictEqual(personMock);
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
    jest.spyOn(prismaService.person, 'findFirst').mockResolvedValue(personMock);

    jest.spyOn(prismaService.person, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(usecase, 'execute');

    await expect(usecase.execute(updatePersonInputMock)).rejects.toThrow(
      HttpException,
    );

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
