import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Employee } from '@prisma/client';

import { Auth } from '../../../core/decorators/auth.decorator';
import { RecruiterGuard } from '../../../core/guards/recruiter.role.guard';
import { SuccessAPIResponse } from '../../../core/models/web.model';
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
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<SuccessAPIResponse<dto.GetApplicationsInternResponse>> {
    const result = await this.internApplicationService.getApplicationsIntern(
      employee,
      { name, limit, page }
    );

    return new SuccessAPIResponse('Success to get intern applications.', result);
  }

  // @Get('/:applicationId')
  // async getApplicationInternDetailById(
  //   @Param('applicationId') applicationId: string,
  // ): Promise<SuccessAPIResponse<dto.ConfirmApplicationInternResponse>> { }

  // @Patch('/:applicationId')
  // async ConfirmApplicationInternDetailById(
  //   @Param('applicationId') applicationId: string,
  //   @Body() body: dto.ConfirmApplicationInternByIdRequest,
  // ): Promise<SuccessAPIResponse<dto.ConfirmApplicationInternResponse>> { }

  // @Delete('/:applicationId')
  // async DeleteApplicationInternDetailById(
  //   @Param('applicationId') applicationId: string
  // ): Promise<SuccessAPIResponse<dto.DeleteApplicationInternResponse>> {}
}
