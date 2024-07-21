
import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class NotFound extends ParentCustomAPIError {
  statusCode = HttpStatus.NOT_FOUND;
  constructor(message: string) {
    super(message);

    this.name = 'NotFoundError';
  }
}

export default NotFound;
