import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  employeeJwtAccessTokenSecret: process.env.EMPLOYEE_JWT_ACCESS_TOKEN_SECRET as string,
  jwtIdTokenExpiration: process.env.JWT_ID_TOKEN_EXPIRATION as string,
}));
