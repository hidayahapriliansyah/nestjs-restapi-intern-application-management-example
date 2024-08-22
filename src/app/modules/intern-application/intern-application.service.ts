import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { ValidationService } from '../../../common/validation.service';
import BadRequest from '../../../core/exceptions/bad-request';
import NotFound from '../../../core/exceptions/not-found';
import {
  ConfirmedInternApplicationHistory,
  InternApplicationConfirmation,
} from '../../../database/entities/confirmed-intern-application-history.entity';
import { Employee } from '../../../database/entities/employee.entity';
import {
  InternApplication,
  InternApplicationStatus,
} from '../../../database/entities/intern-application.entity';
import {
  ConfirmedInternApplicationHistoryRepository,
} from '../../../database/repositories/confirmed-intern-application-history.repository';
import {
  InternApplicationRepository,
} from '../../../database/repositories/intern-application.repository';
import * as dto from './intern-application.dto';
import {
  ConfirmApplicationInternRequestBodyDto,
  GetApplicationsInternRequestQueryDto,
} from './intern-application.validation';

@Injectable()
export class InternApplicationService {
  constructor(
    // @InjectRepository(InternApplication)
    // private internApplicationRepository: Repository<InternApplication>,
    private internApplicationRepository: InternApplicationRepository,
    @InjectRepository(ConfirmedInternApplicationHistory)
    private confirmedInternApplicationHistoryRepository:
      ConfirmedInternApplicationHistoryRepository,
    // private confirmedInternApplicationHistoryRepository: Repository<
    //   ConfirmedInternApplicationHistory
    // >,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) { }

  async getApplicationsIntern(
    employee: Employee,
    {
      name,
      limit = 10,
      page = 1,
    }: {
      name?: string;
      page?: number;
      limit?: number;
    },
  ): Promise<dto.GetApplicationsInternResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(
      // eslint-disable-next-line max-len
      `Employee with username: ${employee.username}, id: ${employee.id} access GET /api/applications/intern`,
    );

    const query = await this.validationService.validate(
      GetApplicationsInternRequestQueryDto,
      { name, limit, page },
    );

    const [dbInternApplications, totalData] =
      await this.internApplicationRepository.findAllAndCountWithFilter({ name, page, limit });

    return {
      applications: dbInternApplications,
      paging: {
        current_page: query.page,
        limit_data: query.limit,
        total_data: totalData,
        total_page: Math.ceil(totalData / query.limit),
      },
    };
  }

  private async checkIsInternApplicationExist(
    applicationId: string,
  ): Promise<InternApplication> {
    const dbInternApplication =
      await this.internApplicationRepository.findOneById(applicationId);

    if (!dbInternApplication) {
      throw new NotFound(
        'Intern application is not found.',
        `Intern application with id ${applicationId} is not found.`,
      );
    }

    return dbInternApplication;
  }

  async getApplicationInternDetailById(
    employee: Employee,
    applicationId: string,
  ): Promise<dto.GetApplicationInternDetailByIdResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(
      // eslint-disable-next-line max-len
      `Employee with username: ${employee.username}, id: ${employee.id} access GET /api/applications/intern/:applicationId`,
    );
    const internApplication =
      await this.checkIsInternApplicationExist(applicationId);
    return internApplication;
  }

  async confirmApplicationInternDetailById(
    employee: Employee,
    applicationId: string,
    body: dto.ConfirmApplicationInternByIdRequest,
  ): Promise<dto.ConfirmApplicationInternResponse> {
    this.logger.info(
      // eslint-disable-next-line max-len
      `Employee with username: ${employee.username}, id: ${employee.id} accessed PATCH /api/applications/intern/:applicationId`,
    );

    const dbInternApplication =
      await this.checkIsInternApplicationExist(applicationId);

    const bodyReq = await this.validationService.validate(
      ConfirmApplicationInternRequestBodyDto,
      body,
    );

    if (dbInternApplication.status !== 'NEED_CONFIRMATION') {
      throw new BadRequest(
        'Application already confirmed.',
        // eslint-disable-next-line max-len
        `Application with id: ${applicationId} already confirmed with status ${dbInternApplication.status}`,
      );
    }

    await this.internApplicationRepository.update({
      where: { id: applicationId },
      data: { status: body.status as InternApplicationStatus },
    });

    // Create history record
    await this.confirmedInternApplicationHistoryRepository.save({
      status: bodyReq.status as InternApplicationConfirmation,
      employee_id: employee.id, // Assuming you have a relationship defined
      intern_application_id: applicationId, // Assuming you have a relationship defined
    });

    return {
      applicationId,
      name: dbInternApplication.name,
      status: bodyReq.status,
    };
  }

  async deleteApplicationInternDetailById(
    employee: Employee,
    applicationId: string,
  ): Promise<dto.DeleteApplicationInternResponse> {
    this.logger.info(
      // eslint-disable-next-line max-len
      `Employee with username: ${employee.username}, id: ${employee.id} accessed DELETE /api/applications/intern/:applicationId`,
    );

    const dbUpdatedInternApplication = await this.internApplicationRepository.update({
      where: { id: applicationId },
      data: { is_deleted: true },
    });

    if (!dbUpdatedInternApplication) {
      throw new NotFound(
        'Intern application is not found.',
        `Intern application with id ${applicationId} is not found.`,
      );
    }

    // Create history record
    await this.confirmedInternApplicationHistoryRepository.save({
      status: 'DELETED' as InternApplicationConfirmation,
      employee_id: employee.id, // Assuming you have a relation set up
      intern_application_id: applicationId,
    });

    return {
      applicationId,
    };
  }
}
