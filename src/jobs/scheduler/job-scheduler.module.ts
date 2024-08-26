import { Module } from '@nestjs/common';

import { NotificationModule } from '../../app/modules/notification/notification.module';
import { NotificationScheduler } from './notification.scheduler';

@Module({
  imports: [NotificationModule],
  providers: [NotificationScheduler],
})
export class JobSchedulerModule { }