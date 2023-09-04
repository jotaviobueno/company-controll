import { Module, ModuleMetadata } from '@nestjs/common';
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
import { AuthGuard } from './guards';

export const accessModuleMock: ModuleMetadata = {
  imports: [
    GoogleModule,
    PersonModule,
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
    { provide: IAccessRepository, useClass: AccessRepository },
  ],
  exports: [AuthGuard, AccessFindOneUseCase],
};

@Module(accessModuleMock)
export class AccessModule {}
