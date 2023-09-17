import { Injectable } from '@nestjs/common';
import { IFinanceRepository } from './ifinance.repository';

@Injectable()
export class FinanceRepository extends IFinanceRepository {}
