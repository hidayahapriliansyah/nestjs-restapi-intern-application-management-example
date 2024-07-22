import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { Observable } from 'rxjs';

import Unauthorized from '../exceptions/unauthorized';

@Injectable()
export class RecruiterGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as Employee;

    if (user.role !== 'RECRUITER') {
      throw new Unauthorized('Forbidden to access resource.', 'User is not recruiter');
    }

    return true;
  }
}