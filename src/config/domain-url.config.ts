import { registerAs } from '@nestjs/config';

export default registerAs('domainUrl', () => ({
  employeeWebHostDomain: process.env.EMPLOYEE_WEB_HOST_DOMAIN as string,
}));
