import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class Unauthorized extends ParentCustomAPIError {
  statusCode = HttpStatus.FORBIDDEN;
  constructor(message: string) {
    super(message);

    this.name = 'UnauthorizedError';
  }
}

export default Unauthorized;
