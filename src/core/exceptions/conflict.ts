
import { HttpStatus } from '@nestjs/common';

import CustomAPIError from './parent-cusom-api-error';

class Conflict extends CustomAPIError {
  statusCode = HttpStatus.CONFLICT;
  constructor(message: string) {
    super(message);

    this.name = 'ConflictError';
  }
}

export default Conflict;
