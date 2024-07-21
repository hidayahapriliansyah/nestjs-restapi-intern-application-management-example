import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class BadRequest extends ParentCustomAPIError {
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(message: string) {
    super(message);

    this.name = 'BadRequestError';
  }
}

export default BadRequest;
