import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfirmedInternApplicationHistory,
} from '../database/entities/confirmed-intern-application-history.entity';
import { Employee } from '../database/entities/employee.entity';
import { InternApplication } from '../database/entities/intern-application.entity';
import { E2EService } from './e2e.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      InternApplication,
      ConfirmedInternApplicationHistory,
    ]),
  ],
  providers: [E2EService],
})
export class E2EModule { }