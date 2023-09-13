import { Module, ModuleMetadata, forwardRef } from '@nestjs/common';
import { FinanceResolver } from './finance.resolver';
import { FinanceCreateUseCase, FinanceFindAllUseCase } from './use-cases';
import {
  FinanceRepository,
  IFinanceRepository,
} from 'src/repositories/finance';
import { PrismaModule } from 'src/db/prisma.module';
import { FinanceController } from './finance.controller';
import { InvoiceModule } from '../invoice/invoice.module';
import { LoaderInvoiceByInvoiceId } from './dataloaders';

// TODO: Criar testes nesse module

export const financeModuleMock: ModuleMetadata = {
  imports: [PrismaModule, forwardRef(() => InvoiceModule)],
  controllers: [FinanceController],
  providers: [
    FinanceResolver,
    FinanceCreateUseCase,
    FinanceFindAllUseCase,
    LoaderInvoiceByInvoiceId,
    { provide: IFinanceRepository, useClass: FinanceRepository },
  ],
  exports: [FinanceCreateUseCase],
};

@Module(financeModuleMock)
export class FinanceModule {}
