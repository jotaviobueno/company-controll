import { Injectable } from '@nestjs/common';
import { ICompanyProviderRepository } from './icompany-provider.repository';

@Injectable()
export class CompanyProviderRepository extends ICompanyProviderRepository {}
