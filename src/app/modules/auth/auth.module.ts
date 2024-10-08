import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from '../../../database/entities/employee.entity';
import { EmployeeRepository } from '../../../database/repositories/employee.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [
    AuthService,
    EmployeeRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
