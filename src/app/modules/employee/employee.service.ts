import { Injectable } from '@nestjs/common';

import { BcryptService } from '../../../common/bcrypt.service';
import { ValidationService } from '../../../common/validation.service';
import Conflict from '../../../core/exceptions/conflict';
import { EmployeeRepository } from '../../../database/repositories/employee.repository';
import * as dto from './employee.dto';
import { CreateEmployeeRequestSchema } from './employee.validation';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private validationService: ValidationService,
    private bcyptService: BcryptService,
  ) { }

  async createEmployee(
    data: dto.EmployeeCreateRequest
  ): Promise<dto.EmployeeCreateResponse> {
    const bodyReq = await this.validationService.validate(CreateEmployeeRequestSchema, data);

    const dbEmployee = await this.employeeRepository.findByUsername(bodyReq.username);

    if (dbEmployee) {
      throw new Conflict('Username already used. Please use another username.', 'Conflict error');
    }

    const hashedPassword = await this.bcyptService.hash(bodyReq.password);
    bodyReq.password = hashedPassword;

    const dbCreatedEmployee = await this.employeeRepository.create(bodyReq);

    return {
      employeeId: dbCreatedEmployee.id,
      name: dbCreatedEmployee.name,
      role: dbCreatedEmployee.role,
    };
  }
}