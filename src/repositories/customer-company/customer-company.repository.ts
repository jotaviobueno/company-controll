import { ICustomerCompanyRepository } from './icustomer-company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerCompanyRepository extends ICustomerCompanyRepository {}
