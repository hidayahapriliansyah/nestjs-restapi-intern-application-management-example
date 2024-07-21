import { registerAs } from '@nestjs/config';

export default registerAs('domainUrl', () => ({
  employeeWebHostDomainName: process.env.EMPLOYEE_WEB_HOST_DOMAIN_NAME as string,
}));
