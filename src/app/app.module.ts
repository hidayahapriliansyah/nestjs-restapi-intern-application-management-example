import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { CommonModule } from '../common/common.module';
import cookieConfig from '../config/cookie.config';
import domainUrlConfig from '../config/domain-url.config';
import jwtConfig from '../config/jwt.config';
import { ErrorFilter } from '../core/filters/exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { InternApplicationModule } from './modules/intern-application/intern-application.module';

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
    CommonModule,
    AuthModule,
    InternApplicationModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule { }
