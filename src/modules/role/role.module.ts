import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import {
  RoleFindAllUseCase,
  RoleFindManyWithIdsUseCase,
  RoleUpdateUseCase,
} from './use-cases';
import { RoleFindOneUseCase } from './use-cases/find-one';
import { PrismaModule } from 'src/db/prisma.module';
import { PersonModule } from '../person/person.module';
import { AccessModule } from '../access/access.module';
import { IRoleRepository, RoleRepository } from 'src/repositories/role';
import { PersonRoleModule } from '../person-role/person-role.module';

export const roleModuleMock: ModuleMetadata = {
  imports: [
    PrismaModule,
    forwardRef(() => PersonModule),
    forwardRef(() => PersonRoleModule),
    forwardRef(() => AccessModule),
  ],
  providers: [
    RoleResolver,
    RoleFindAllUseCase,
    RoleFindOneUseCase,
    RoleUpdateUseCase,
    RoleFindManyWithIdsUseCase,
    { provide: IRoleRepository, useClass: RoleRepository },
  ],
  exports: [RoleFindOneUseCase, RoleFindManyWithIdsUseCase],
};

@Module(roleModuleMock)
export class RoleModule {}
