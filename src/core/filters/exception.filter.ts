import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

import ParentCustomAPIError from '../exceptions/parent-cusom-api-error';
import { ErrorAPIResponse } from '../models/web.model';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof ParentCustomAPIError) {
      response
        .status(exception.statusCode)
        .json(
          new ErrorAPIResponse(exception.message, exception.errors)
        );
      return;
    } else if (exception instanceof ZodError) {
      response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new ErrorAPIResponse(exception.message, exception.errors)
        );
      return;
    } else if (exception instanceof BadRequestException) {
      response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new ErrorAPIResponse('Validation Error.', exception.message)
        );
      return;
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new ErrorAPIResponse(
            exception?.message ?? 'Internal server error',
            exception?.errors ?? 'Unknown error'
          )
        );
      return;
    }
  }
}
