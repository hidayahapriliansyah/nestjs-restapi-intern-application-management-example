import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { JwtService } from './jwt.service';
import { BcryptService } from './bcrypt.service';

@Global()
@Module({
  providers: [
    PrismaService,
    ValidationService,
    JwtService,
    BcryptService
  ],
  exports: [
    PrismaService,
    ValidationService,
    JwtService,
    BcryptService
  ]
})
export class CommonModule { }