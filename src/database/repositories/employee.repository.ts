import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) { }

  async findAll(query): Promise<[Employee[], number]> {
    return this.repository.findAndCount(query);
  }

  async findByUsername(username: string): Promise<Employee | null> {
    return this.repository.findOne({ where: { username } });
  }

  async create(data: DeepPartial<Employee>) {
    return await this.repository.save(data);
  }
}
