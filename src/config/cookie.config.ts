import { registerAs } from '@nestjs/config';

export default registerAs('cookie', () => ({
  employeeAccessTokenCookieName: process.env.EMPLOYEE_ACCESS_TOKEN_COOKIE_NAME as string,
}));
