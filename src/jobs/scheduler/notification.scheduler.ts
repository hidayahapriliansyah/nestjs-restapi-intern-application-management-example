import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { NotificationService } from '../../app/modules/notification/notification.service';

@Injectable()
export class NotificationScheduler {
  constructor(
    private notificationService: NotificationService,
  ) { }

  @Cron('0 0 * * *') // Setiap hari pada jam 00:00 (tengah malam)
  async sendNotificationForPendingApplications() {
    await this.notificationService.sendNotificationForPendingApplications();
  }
}
