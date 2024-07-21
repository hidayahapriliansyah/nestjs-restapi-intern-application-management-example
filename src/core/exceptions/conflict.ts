
import { HttpStatus } from '@nestjs/common';

import CustomAPIError from './parent-cusom-api-error';

class Conflict extends CustomAPIError {
  statusCode = HttpStatus.CONFLICT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, errors: any) {
    super(message, errors);

    this.name = 'ConflictError';
  }
}

export default Conflict;
