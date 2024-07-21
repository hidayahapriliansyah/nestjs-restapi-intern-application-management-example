import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class BadRequest extends ParentCustomAPIError {
  statusCode = HttpStatus.BAD_REQUEST;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message, errors);

    this.name = 'BadRequestError';
  }
}

export default BadRequest;
