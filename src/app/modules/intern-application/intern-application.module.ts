import { Module } from '@nestjs/common';

import { InternApplicationController } from './intern-application.controller';
import { InternApplicationService } from './intern-application.service';

@Module({
  controllers: [InternApplicationController],
  providers: [InternApplicationService],
})
export class InternApplicationModule { }
