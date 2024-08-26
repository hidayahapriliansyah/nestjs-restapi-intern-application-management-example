import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { EmployeeNotification } from '../entities/employee-notification.entity';

@Injectable()
export class EmployeeNotificationRepository {
  constructor(
    @InjectRepository(EmployeeNotification)
    private readonly repository: Repository<EmployeeNotification>,
  ) { }

  async create(data: DeepPartial<EmployeeNotification>) {
    return await this.repository.save(data);
  }

  async find(): Promise<EmployeeNotification[]> {
    return await this.repository.find();
  }
}
