import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class Unauthenticated extends ParentCustomAPIError {
  statusCode = HttpStatus.UNAUTHORIZED;
  constructor(message: string) {
    super(message);

    this.name = 'UnauthenticatedError';
  }
}

export default Unauthenticated;
