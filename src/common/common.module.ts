import { Global, Module } from '@nestjs/common';

import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';

@Global()
@Module({
  providers: [
    PrismaService,
    ValidationService,
    JwtService,
    BcryptService,
  ],
  exports: [
    PrismaService,
    ValidationService,
    JwtService,
    BcryptService,
  ],
})
export class CommonModule { }