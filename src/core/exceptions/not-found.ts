
import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class NotFound extends ParentCustomAPIError {
  statusCode = HttpStatus.NOT_FOUND;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message, errors);

    this.name = 'NotFoundError';
  }
}

export default NotFound;
