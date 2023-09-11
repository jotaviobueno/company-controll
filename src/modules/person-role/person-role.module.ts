import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { PersonRoleResolver } from './person-role.resolver';
import {
  PersonRoleFindAllWithPersonId,
  PersonRoleAssigRoleUseCase,
  PersonRoleRemoveRoleUseCase,
  PersonRoleFindManyWithPersonIdUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';
import {
  IPersonRoleRepository,
  PersonRoleRepository,
} from 'src/repositories/person-role';
import { LoaderRolesByPersonId } from './dataloaders';
import { PersonModule } from '../person/person.module';
import { RoleModule } from '../role/role.module';

export const personRoleModuleMock: ModuleMetadata = {
  imports: [
    PrismaModule,
    forwardRef(() => PersonModule),
    forwardRef(() => RoleModule),
  ],
  providers: [
    PersonRoleResolver,
    PersonRoleAssigRoleUseCase,
    PersonRoleFindAllWithPersonId,
    PersonRoleRemoveRoleUseCase,
    PersonRoleFindManyWithPersonIdUseCase,
    LoaderRolesByPersonId,
    { provide: IPersonRoleRepository, useClass: PersonRoleRepository },
  ],
  exports: [PersonRoleFindAllWithPersonId, LoaderRolesByPersonId],
};

@Module(personRoleModuleMock)
export class PersonRoleModule {}
