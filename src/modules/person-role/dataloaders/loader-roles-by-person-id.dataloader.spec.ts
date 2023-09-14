import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/db/prisma.service';
import { LoaderRolesByPersonId } from './loader-roles-by-person-id.dataloader';
import { personRoleModuleMock } from '../person-role.module';
import { personRoleMock, roleMock } from 'src/domain/mocks';

describe('LoaderRolesByPersonId', () => {
  let dataloader: LoaderRolesByPersonId;
  let moduleRef: TestingModule;
  let prismaService: PrismaService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(personRoleModuleMock).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dataloader = moduleRef.get<LoaderRolesByPersonId>(LoaderRolesByPersonId);
  });

  it('should be defined', () => {
    expect(dataloader).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should create', async () => {
    jest
      .spyOn(prismaService.personRole, 'findMany')
      .mockResolvedValue([personRoleMock]);

    jest.spyOn(prismaService.role, 'findMany').mockResolvedValue([roleMock]);

    const response = await dataloader.load('1');

    expect(response).toStrictEqual([roleMock]);
  });
});
