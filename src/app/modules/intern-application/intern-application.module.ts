import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfirmedInternApplicationHistory,
} from '../../../database/entities/confirmed-intern-application-history.entity';
import { InternApplication } from '../../../database/entities/intern-application.entity';
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
  providers: [InternApplicationService],
})
export class InternApplicationModule { }
