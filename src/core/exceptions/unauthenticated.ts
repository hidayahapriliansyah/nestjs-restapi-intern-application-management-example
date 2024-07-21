import { HttpStatus } from '@nestjs/common';

import ParentCustomAPIError from './parent-cusom-api-error';

class Unauthenticated extends ParentCustomAPIError {
  statusCode = HttpStatus.UNAUTHORIZED;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message, errors);

    this.name = 'UnauthenticatedError';
  }
}

export default Unauthenticated;
