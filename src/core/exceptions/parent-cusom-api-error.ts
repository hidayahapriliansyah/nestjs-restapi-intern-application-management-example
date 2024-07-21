import { HttpStatus } from '@nestjs/common';

abstract class ParentCustomAPIError extends Error {
  abstract statusCode: HttpStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message);
    this.errors = errors;
  }
}

export default ParentCustomAPIError;
