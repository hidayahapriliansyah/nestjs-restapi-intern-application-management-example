import { z } from 'zod';

export const employeeSignInRequestSchema = z.object({
  username: z.string().min(1).max(30),
  password: z.string().min(6).max(255),
});
