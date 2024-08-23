import { EmployeeRole } from '../../../database/entities/employee.entity';
import { CreateEmployeeRequestSchema } from './employee.validation';

export type EmployeeCreateResponse = {
  employeeId: string;
  name: string;
  role: EmployeeRole;
};

export type EmployeeCreateRequest = CreateEmployeeRequestSchema;