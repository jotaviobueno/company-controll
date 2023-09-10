import { Module, ModuleMetadata } from '@nestjs/common';
import { FinanceResolver } from './finance.resolver';
import { FinanceCreateUseCase } from './use-cases';
import {
  FinanceRepository,
  IFinanceRepository,
} from 'src/repositories/finance';
import { PrismaModule } from 'src/db/prisma.module';
import { FinanceController } from './finance.controller';

export const financeModuleMock: ModuleMetadata = {
  imports: [PrismaModule],
  controllers: [FinanceController],
  providers: [
    FinanceResolver,
    FinanceCreateUseCase,
    { provide: IFinanceRepository, useClass: FinanceRepository },
  ],
  exports: [FinanceCreateUseCase],
};

@Module(financeModuleMock)
export class FinanceModule {}
