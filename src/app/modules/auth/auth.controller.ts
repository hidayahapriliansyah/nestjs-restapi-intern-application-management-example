import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';

import { JwtService } from '../../../common/jwt.service';
import cookieConfig from '../../../config/cookie.config';
import domainUrlConfig from '../../../config/domain-url.config';
import { SuccessAPIResponse } from '../../../core/models/web.model';
import { PayloadDataEmployeeAccessToken } from '../../../core/types/payload.type';
import * as dto from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @Inject(domainUrlConfig.KEY) private DOMAIN_URL_CONF: ConfigType<typeof domainUrlConfig>,
    @Inject(cookieConfig.KEY) private COOKIE_CONF: ConfigType<typeof cookieConfig>
  ) { }

  @Post()
  async signinEmployee(
    @Body() data: dto.EmployeeSignInRequest,
    @Res() res: Response,
  ) {
    const dbEmployee = await this.authService.signinEmployee(data);

    const accessToken = this.jwtService.create<PayloadDataEmployeeAccessToken>({
      id: dbEmployee.id,
    });

    const cookieName = this.COOKIE_CONF.employeeAccessTokenCookieName;

    const env = process.env.NODE_ENV;
    if (env === 'production') {
      res.cookie(cookieName, accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: this.DOMAIN_URL_CONF.employeeWebHostDomainName,
      });
    } else {
      res.cookie(cookieName, accessToken, { httpOnly: true });
    }

    res
      .status(200)
      .json(new SuccessAPIResponse('Login successfully.', {
        id: dbEmployee.id,
      }));
  }
}
