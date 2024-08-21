import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Employee } from '../../../database/entities/employee.entity';
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