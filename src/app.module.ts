import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';

@Module({
  imports: [GraphqlModule, PrismaModule, AccessModule],
})
export class AppModule {}
