import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from '../../../database/entities/employee.entity';
import { EmployeeRepository } from '../../../database/repositories/employee.repository';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  providers: [
    EmployeeRepository,
    EmployeeService,
  ],
  controllers: [EmployeeController],
})
export class EmployeeModule { }