import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfirmedInternApplicationHistory,
} from '../../../database/entities/confirmed-intern-application-history.entity';
import { InternApplication } from '../../../database/entities/intern-application.entity';
import {
  ConfirmedInternApplicationHistoryRepository,
} from '../../../database/repositories/confirmed-intern-application-history.repository';
import {
  InternApplicationRepository,
} from '../../../database/repositories/intern-application.repository';
import { InternApplicationController } from './intern-application.controller';
import { InternApplicationService } from './intern-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InternApplication,
      ConfirmedInternApplicationHistory,
    ]),
  ],
  controllers: [InternApplicationController],
  providers: [
    ConfirmedInternApplicationHistoryRepository,
    InternApplicationRepository,
    InternApplicationService,
  ],

})
export class InternApplicationModule { }
