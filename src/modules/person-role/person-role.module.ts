import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { PersonRoleResolver } from './person-role.resolver';
import {
  PersonRoleFindAllWithPersonid,
  PersonRoleAssigRoleUseCase,
  PersonRoleRemoveRoleUseCase,
  PersonRoleFindManyWithPersonIdUseCase,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { PrismaModule } from 'src/db/prisma.module';
import {
  IPersonRoleRepository,
  PersonRoleRepository,
} from 'src/repositories/person-role';
import { RoleGuard } from './guards';
import { RoleModule } from '../role/role.module';
import { AccessModule } from '../access/access.module';
import { LoaderRolesByPersonId } from './dataloaders';

export const personRoleModuleMock: ModuleMetadata = {
  imports: [
    forwardRef(() => PersonModule),
    forwardRef(() => AccessModule),
    PrismaModule,
    forwardRef(() => RoleModule),
  ],
  providers: [
    PersonRoleResolver,
    PersonRoleAssigRoleUseCase,
    PersonRoleFindAllWithPersonid,
    PersonRoleRemoveRoleUseCase,
    PersonRoleFindManyWithPersonIdUseCase,
    RoleGuard,
    LoaderRolesByPersonId,
    { provide: IPersonRoleRepository, useClass: PersonRoleRepository },
  ],
  exports: [RoleGuard, PersonRoleFindAllWithPersonid, LoaderRolesByPersonId],
};

@Module(personRoleModuleMock)
export class PersonRoleModule {}
