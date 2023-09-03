import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessResolver } from './access.resolver';

@Module({
  providers: [AccessResolver, AccessService],
})
export class AccessModule {}
