import { Inject, Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { BcryptService } from '../../../common/bcrypt.service';
import { PrismaService } from '../../../common/prisma.service';
import { ValidationService } from '../../../common/validation.service';
import Unauthenticated from '../../../core/exceptions/unauthenticated';
import * as dto from './auth.dto';
import { employeeSignInRequestSchema } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private bcryptService: BcryptService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) { }

  throwUnauthenticatedError(data: unknown) {
    this.logger
      .info('Failed to login. User access /api/auth with request body data: ', data);
    throw new Unauthenticated('Unauthenticated user.');
  }

  async signinEmployee(
    data: dto.EmployeeSignInRequest
  ): Promise<Employee> {
    this.logger.info('User access /api/auth with request body data: ', data);

    try {
      this.validationService.validate(employeeSignInRequestSchema, data);
    } catch (error) {
      this.throwUnauthenticatedError(data);
    }

    const dbEmployee = await this.prismaService.employee.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!dbEmployee) {
      this.throwUnauthenticatedError(data);
    }

    const isPasswordValid = await this.bcryptService.compare(data.password, dbEmployee.password);
    if (!isPasswordValid) {
      throw new Unauthenticated('Unauthenticated user.');
    }

    return dbEmployee;
  }
}
