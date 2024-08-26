import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { EmployeeRepository } from '../../../database/repositories/employee.repository';
import {
  EmployeeNotificationRepository,
} from '../../../database/repositories/employee-notification.repository';
import {
  InternApplicationRepository,
} from '../../../database/repositories/intern-application.repository';

@Injectable()
export class NotificationService {
  constructor(
    private employeeNotificationRepository: EmployeeNotificationRepository,
    private internApplicationRepository: InternApplicationRepository,
    private employeeRepository: EmployeeRepository,
  ) { }

  @Cron('0 0 * * *') // Setiap hari pada jam 00:00 (tengah malam)
  async sendNotificationForPendingApplications() {
    const pendingApplications = await this.internApplicationRepository.findAll({
      where: { status: 'NEED_CONFIRMATION' },
    });

    if (pendingApplications.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [employees, totalEmployees] = await this.employeeRepository.findAll({
        where: { role: 'RECRUITER' },
      });

      for (const employee of employees) {
        await this.employeeNotificationRepository.create({
          description: `Terdapat ${pendingApplications.length} yang membutuhkan konfirmasi.`,
          is_read: false,
          employee_id: employee.id,
        });
      }
    }
  }
}