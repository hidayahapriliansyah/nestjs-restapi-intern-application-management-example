import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationService {
  async validate<T extends object>(classType: new () => T, data: T): Promise<T> {
    const instance = plainToClass(classType, data);

    console.log('instance =>', instance);

    const errors: ValidationError[] = await validate(instance);

    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${JSON.stringify(errors.map(e => e.constraints))}`
      );
    }

    return instance;
  }
}
