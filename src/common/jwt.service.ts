import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt.config';
import Unauthenticated from '../core/exceptions/unauthenticated';

@Injectable()
export class JwtService {
  constructor(
    @Inject(jwtConfig.KEY) private JWT_CONF: ConfigType<typeof jwtConfig>
  ) { }

  create<T extends object>(payload: T) {
    const jwtSecret = this.JWT_CONF.employeeJwtAccessTokenSecret;

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: this.JWT_CONF.employeeJwtAccessTokenSecret,
    });

    return token;
  }

  checkIsValid<T>(token: string, secret: string): T {
    try {
      return jwt.verify(token, secret) as T;
    } catch (errror: unknown) {
      throw new Unauthenticated('Unauthenticated user.');
    }
  }
}
