import { Injectable } from '@nestjs/common';

import { EmployeeRole } from '../../../database/entities/employee.entity';
import { InternApplicationStatus } from '../../../database/entities/intern-application.entity';
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

  async sendNotificationForPendingApplications() {
    const pendingApplications = await this.internApplicationRepository.findAll({
      where: { status: InternApplicationStatus.NEED_CONFIRMATION },
    });

    if (pendingApplications.length > 0) {
      const [employees] = await this.employeeRepository.findAll({
        where: { role: EmployeeRole.RECRUITER },
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