import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Auth } from '../../../core/decorators/auth.decorator';
import { RecruiterGuard } from '../../../core/guards/recruiter.role.guard';
import { SuccessAPIResponse } from '../../../core/models/web.model';
import { OptionalParseIntPipe } from '../../../core/pipes/optional-parse-int.pipe';
import { Employee } from '../../../database/entities/employee.entity';
import * as dto from './intern-application.dto';
import { InternApplicationService } from './intern-application.service';

@Controller('/api/applications/intern')
@UseGuards(RecruiterGuard)
export class InternApplicationController {
  constructor(
    private internApplicationService: InternApplicationService
  ) { }

  @Get()
  async getApplicationsIntern(
    @Auth() employee: Employee,
    @Query('name') name?: string,
    @Query('page', OptionalParseIntPipe) page?: number,
    @Query('limit', OptionalParseIntPipe) limit?: number,
  ) {
    const result = await this.internApplicationService.getApplicationsIntern(
      employee,
      { name, limit, page }
    );
    return new SuccessAPIResponse('Success to get intern applications.', result);
  }

  @Get('/:applicationId')
  async getApplicationInternDetailById(
    @Auth() employee: Employee,
    @Param('applicationId') applicationId: string,
  ): Promise<SuccessAPIResponse<dto.GetApplicationInternDetailByIdResponse>> {
    const result = await this.internApplicationService.getApplicationInternDetailById(
      employee,
      applicationId,
    );
    return new SuccessAPIResponse('Success to get intern application detail.', result);
  }

  @Patch('/:applicationId')
  async confirmApplicationInternDetailById(
    @Auth() employee: Employee,
    @Param('applicationId') applicationId: string,
    @Body() body: dto.ConfirmApplicationInternByIdRequest,
  ): Promise<SuccessAPIResponse<dto.ConfirmApplicationInternResponse>> {
    const result = await this.internApplicationService.confirmApplicationInternDetailById(
      employee,
      applicationId,
      body,
    );
    return new SuccessAPIResponse('Success to confirm intern application.', result);
  }

  @Delete('/:applicationId')
  async deleteApplicationInternDetailById(
    @Auth() employee: Employee,
    @Param('applicationId') applicationId: string
  ): Promise<SuccessAPIResponse<dto.DeleteApplicationInternResponse>> {
    const result = await this.internApplicationService.deleteApplicationInternDetailById(
      employee,
      applicationId,
    );
    return new SuccessAPIResponse('Success to delete intern application.', result);
  }
}
