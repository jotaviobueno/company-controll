import { Global, Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { AccessResolver } from './access.resolver';
import {
  AccessCreateUseCase,
  AccessFindByCodeOrUpdateUseCase,
  AccessFindOneUseCase,
  AccessHandlerUseCase,
} from './use-cases';
import { GoogleModule } from '../google/google.module';
import { PrismaModule } from 'src/db/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';
import { AccessRepository, IAccessRepository } from 'src/repositories/access';
import { PersonModule } from '../person/person.module';
import { AuthGuard, RoleGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { PersonRoleModule } from '../person-role/person-role.module';

export const accessModuleMock: ModuleMetadata = {
  imports: [
    GoogleModule,
    forwardRef(() => PersonModule),
    PersonRoleModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AccessResolver,
    AccessFindByCodeOrUpdateUseCase,
    AccessHandlerUseCase,
    AccessCreateUseCase,
    AccessFindOneUseCase,
    AuthGuard,
    RoleGuard,
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    { provide: IAccessRepository, useClass: AccessRepository },
  ],
  exports: [AccessFindOneUseCase, RoleGuard],
};

@Global()
@Module(accessModuleMock)
export class AccessModule {}
