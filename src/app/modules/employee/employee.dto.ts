import { CreateEmployeeRequestSchema } from './employee.validation';

export type CreateEmployeeResponse = {
  employeeId: string;
  name: string;
  role: 'EMPLOYEE' | 'RECRUITER';
};

export type CreateEmployeeRequest = CreateEmployeeRequestSchema;