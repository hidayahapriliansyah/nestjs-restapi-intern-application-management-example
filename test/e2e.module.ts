import { Module } from '@nestjs/common';

import { E2EService } from './e2e.service';

@Module({
  providers: [E2EService],
})
export class E2EModule { }