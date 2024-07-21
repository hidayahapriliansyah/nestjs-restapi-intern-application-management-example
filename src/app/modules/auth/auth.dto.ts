import { Employee } from '@prisma/client';
import { z } from 'zod';

import { employeeSignInRequestSchema } from './auth.validation';

export type EmployeeSignInRequest = z.infer<typeof employeeSignInRequestSchema>;

export type EmployeeAuthSignResponse = {
  id: Employee['id'];
};