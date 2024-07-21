import { HttpStatus } from '@nestjs/common';

abstract class ParentCustomAPIError extends Error {
  abstract statusCode: HttpStatus;

  constructor(message: string) {
    super(message);
  }
}

export default ParentCustomAPIError;
