import { z } from 'zod';

import { Employee } from '../../../database/entities/employee.entity';
import { employeeSignInRequestSchema } from './auth.validation';

export type EmployeeSignInRequest = z.infer<typeof employeeSignInRequestSchema>;

export type EmployeeAuthSignResponse = {
  id: Employee['id'];
};