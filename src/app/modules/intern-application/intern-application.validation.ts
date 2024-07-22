import { z } from 'zod';

export const getApplicationsInternRequestQuerySchema = z.object({
  name: z.string().optional(),
  limit: z.number().positive().optional(),
  page: z.number().positive().optional(),
});

export const confirmApplicationInternRequestBodySchema = z.object({
  status: z.enum(['ACCEPTED', 'REJECTED']),
});