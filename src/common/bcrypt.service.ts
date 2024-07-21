import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs';

@Injectable()
export class BcryptService {
  async compare(
    rawPassword: string, hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcryptjs.compare(rawPassword, hashedPassword);
    return isMatch;
  }

  async hash(rawPassword: string): Promise<string> {
    const hashedPassword = await bcryptjs.hash(rawPassword, 12);
    return hashedPassword;
  }
}