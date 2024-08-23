import { IsEnum, IsString, Length } from 'class-validator';

import { EmployeeRole } from '../../../database/entities/employee.entity';

export class CreateEmployeeRequestSchema {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(1, 30)
  username: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsEnum(EmployeeRole, {
    message: 'Role must be either EMPLOYEE or RECRUITER',
  })
  role: EmployeeRole;
}
