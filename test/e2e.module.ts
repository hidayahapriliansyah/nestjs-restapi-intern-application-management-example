import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfirmedInternApplicationHistory,
} from '../src/database/entities/confirmed-intern-application-history.entity';
import { Employee } from '../src/database/entities/employee.entity';
import { InternApplication } from '../src/database/entities/intern-application.entity';
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