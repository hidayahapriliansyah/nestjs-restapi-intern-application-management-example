import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from '../../database/entities/employee.entity';
import { EmployeeNotification } from '../../database/entities/employee-notification.entity';
import { InternApplication } from '../../database/entities/intern-application.entity';
import { EmployeeRepository } from '../../database/repositories/employee.repository';
import {
  EmployeeNotificationRepository,
} from '../../database/repositories/employee-notification.repository';
import {
  InternApplicationRepository,
} from '../../database/repositories/intern-application.repository';
import { NotificationScheduler } from './notification.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeNotification,
      InternApplication,
    ]),
  ],
  providers: [
    EmployeeNotificationRepository,
    EmployeeRepository,
    InternApplicationRepository,
    NotificationScheduler,
  ],
})
export class JobSchedulerModule { }