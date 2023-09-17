import { Injectable } from '@nestjs/common';
import { IPersonCompanyRepository } from './iperson-company.repository';

@Injectable()
export class PersonCompanyRepository extends IPersonCompanyRepository {}
