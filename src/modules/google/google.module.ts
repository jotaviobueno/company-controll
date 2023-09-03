import { Module, ModuleMetadata } from '@nestjs/common';
import { GoogleFindUseByCodeUseCase } from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const googleModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  providers: [GoogleFindUseByCodeUseCase],
  exports: [GoogleFindUseByCodeUseCase],
};

@Module(googleModuleMock)
export class GoogleModule {}
