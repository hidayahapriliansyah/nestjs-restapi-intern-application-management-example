import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from '../../common/jwt.service';
import { PrismaService } from '../../common/prisma.service';
import cookieConfig from '../../config/cookie.config';
import jwtConfig from '../../config/jwt.config';
import Unauthenticated from '../exceptions/unauthenticated';
import { PayloadDataEmployeeAccessToken } from '../types/payload.type';

@Injectable()
export class EmployeeAuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    @Inject(cookieConfig.KEY) private COOKIE_CONF: ConfigType<typeof cookieConfig>,
    @Inject(jwtConfig.KEY) private JWT_CONF: ConfigType<typeof jwtConfig>,
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(req: Request & { user: any }, res: Response, next: NextFunction) {
    const { cookies } = req;

    if (!cookies) {
      throw new Unauthenticated('Unauthenticated user. Please login.', 'Unauthenticated user.');
    }

    const cookieName = this.COOKIE_CONF.employeeAccessTokenCookieName;
    const accessToken = cookies[cookieName];

    if (!accessToken) {
      throw new Unauthenticated('Unauthenticated user. Please login.', 'Unauthenticated user.');
    }

    const payload = this.jwtService.checkIsValid<PayloadDataEmployeeAccessToken>(
      accessToken,
      this.JWT_CONF.employeeJwtAccessTokenSecret,
    );

    const dbEmployee = await this.prismaService.employee.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!dbEmployee) {
      throw new Unauthenticated('Unauthenticated user. Please login.', 'Unauthenticated user.');
    }

    req.user = dbEmployee;

    next();
  }
}