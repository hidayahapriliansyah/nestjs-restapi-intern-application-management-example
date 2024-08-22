import { Global, Module } from '@nestjs/common';

import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { ValidationService } from './validation.service';

@Global()
@Module({
  providers: [
    ValidationService,
    JwtService,
    BcryptService,
  ],
  exports: [
    ValidationService,
    JwtService,
    BcryptService,
  ],
})
export class CommonModule { }