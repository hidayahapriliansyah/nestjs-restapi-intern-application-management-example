import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { dataSourceOptions } from '../../database/data-source';
import { Employee } from '../../database/entities/employee.entity';
import { CommonModule } from '../common/common.module';
import cookieConfig from '../config/cookie.config';
import domainUrlConfig from '../config/domain-url.config';
import jwtConfig from '../config/jwt.config';
import { ErrorFilter } from '../core/filters/exception.filter';
import { EmployeeAuthMiddleware } from '../core/middlewares/employee.auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import {
  InternApplicationController,
} from './modules/intern-application/intern-application.controller';
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
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Employee]),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
    consumer.apply(EmployeeAuthMiddleware).forRoutes(InternApplicationController);
  }
}
