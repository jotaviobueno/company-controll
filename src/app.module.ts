import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { GoogleModule } from './modules/google/google.module';
import { PersonModule } from './modules/person/person.module';
import { CompanyModule } from './modules/company/company.module';
import { PersonCompanyModule } from './modules/person-company/person-company.module';

@Module({
  imports: [GraphqlModule, PrismaModule, AccessModule, GoogleModule, PersonModule, CompanyModule, PersonCompanyModule],
})
export class AppModule {}
