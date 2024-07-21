import { HttpStatus } from '@nestjs/common';

abstract class ParentCustomAPIError extends Error {
  abstract statusCode: HttpStatus;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, private errors: any) {
    super(message);
  }
}

export default ParentCustomAPIError;
