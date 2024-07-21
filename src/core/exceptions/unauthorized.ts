import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class Unauthorized extends ParentCustomAPIError {
  statusCode = HttpStatus.FORBIDDEN;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message, errors);

    this.name = 'UnauthorizedError';
  }
}

export default Unauthorized;
