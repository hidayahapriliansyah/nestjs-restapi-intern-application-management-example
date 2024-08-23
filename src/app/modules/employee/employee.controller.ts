import { Body, Controller, Post } from '@nestjs/common';

import { SuccessAPIResponse } from '../../../core/models/web.model';
import * as dto from './employee.dto';
import { EmployeeService } from './employee.service';

@Controller('/api/employees')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
  ) { }

  @Post()
  async createEmployee(
    @Body() data: dto.CreateEmployeeRequest,
  ): Promise<SuccessAPIResponse<dto.CreateEmployeeResponse>> {
    const result = await this.employeeService.createEmployee(data);

    return new SuccessAPIResponse('Success to create employee.', result);
  }
}