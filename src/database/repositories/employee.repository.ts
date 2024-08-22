import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) { }

  async findByUsername(username: string): Promise<Employee | null> {
    return this.repository.findOne({ where: { username } });
  }
}
