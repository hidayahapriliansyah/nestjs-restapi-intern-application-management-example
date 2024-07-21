import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import cookieConfig from '../config/cookie.config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        jwtConfig,
        cookieConfig,
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
  ]
})
export class AppModule { }
