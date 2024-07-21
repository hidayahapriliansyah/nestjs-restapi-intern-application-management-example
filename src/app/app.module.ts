import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import cookieConfig from '../config/cookie.config';
import domainUrlConfig from '../config/domain-url.config';
import jwtConfig from '../config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        jwtConfig,
        cookieConfig,
        domainUrlConfig,
      ],
      cache: true,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.ms(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
      level: 'info',
      transports: [new winston.transports.Console()],
    }),
    AuthModule,
  ],
})
export class AppModule { }
