import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { BcryptService } from '../../../common/bcrypt.service';
import { ValidationService } from '../../../common/validation.service';
import Unauthenticated from '../../../core/exceptions/unauthenticated';
import { Employee } from '../../../database/entities/employee.entity';
import { EmployeeRepository } from '../../../database/repositories/employee.repository';
import * as dto from './auth.dto';
import { EmployeeSignInRequest } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private validationService: ValidationService,
    private bcryptService: BcryptService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) { }

  handleUnauthenticatedAttempt(data: unknown) {
    this.logger
      .info('Failed to login. User access /api/auth with request body data: ', data);
    throw new Unauthenticated('Unauthenticated user. Please login.', 'Unauthenticated user.');
  }

  async signinEmployee(
    data: dto.EmployeeSignInRequest
  ): Promise<Employee> {
    this.logger.info('User access /api/auth with request body data: ', data);

    try {
      this.validationService.validate(EmployeeSignInRequest, data);
    } catch (error) {
      this.handleUnauthenticatedAttempt(data);
    }

    const dbEmployee = await this.employeeRepository.findByUsername(data.username);

    if (!dbEmployee) {
      this.handleUnauthenticatedAttempt(data);
    }

    const isPasswordValid = await this.bcryptService.compare(
      data.password,
      dbEmployee.password,
    );
    if (!isPasswordValid) {
      this.handleUnauthenticatedAttempt(data);
    }

    return dbEmployee;
  }
}
