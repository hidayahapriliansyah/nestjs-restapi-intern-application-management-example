import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

import {
  ConfirmedInternApplicationHistory,
  InternApplicationConfirmation,
} from '../../../../database/entities/confirmed-intern-application-history.entity';
import { Employee } from '../../../../database/entities/employee.entity';
import {
  InternApplication,
  InternApplicationStatus,
} from '../../../../database/entities/intern-application.entity';
import { ValidationService } from '../../../common/validation.service';
import BadRequest from '../../../core/exceptions/bad-request';
import NotFound from '../../../core/exceptions/not-found';
import * as dto from './intern-application.dto';
import {
  confirmApplicationInternRequestBodySchema,
  getApplicationsInternRequestQuerySchema,
} from './intern-application.validation';

@Injectable()
export class InternApplicationService {
  constructor(
    @InjectRepository(InternApplication)
    private internApplicationRepository: Repository<InternApplication>,
    @InjectRepository(ConfirmedInternApplicationHistory)
    private confirmedInternApplicationHistoryRepository: Repository<
      ConfirmedInternApplicationHistory
    >,
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

    const query = this.validationService.validate(
      getApplicationsInternRequestQuerySchema,
      { name, limit, page },
    );

    const queryBuilder = this.internApplicationRepository
      .createQueryBuilder('internApplication')
      .where('internApplication.is_deleted = :isDeleted', { isDeleted: false });

    if (name && name !== '') {
      queryBuilder.andWhere('internApplication.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.take(limit).skip((query.page - 1) * query.limit);

    const [dbInternApplications, totalData] =
      await queryBuilder.getManyAndCount();

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
    try {
      const dbInternApplication =
        await this.internApplicationRepository.findOne({
          where: {
            id: applicationId,
            is_deleted: false,
          },
        });

      if (!dbInternApplication) {
        throw new NotFound(
          'Intern application is not found.',
          `Intern application with id ${applicationId} is not found.`,
        );
      }

      return dbInternApplication;
    } catch (error) {
      // Tangani kesalahan khusus jika ada
      if (
        (error as Error).message.includes('invalid input syntax for type uuid:')
      ) {
        throw new NotFound(
          'Intern application is not found.',
          `Intern application with id ${applicationId} is not found.`,
        );
      }
      throw error;
    }
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

    const internApplication =
      await this.checkIsInternApplicationExist(applicationId);

    const bodyReq = this.validationService.validate(
      confirmApplicationInternRequestBodySchema,
      body,
    );

    if (internApplication.status !== 'NEED_CONFIRMATION') {
      throw new BadRequest(
        'Application already confirmed.',
        // eslint-disable-next-line max-len
        `Application with id: ${applicationId} already confirmed with status ${internApplication.status}`,
      );
    }

    // Update application status
    internApplication.status = bodyReq.status as InternApplicationStatus;
    const dbUpdatedApplication =
      await this.internApplicationRepository.save(internApplication);

    // Create history record
    await this.confirmedInternApplicationHistoryRepository.save({
      status: bodyReq.status as InternApplicationConfirmation,
      employee_id: employee.id, // Assuming you have a relationship defined
      intern_application_id: dbUpdatedApplication.id, // Assuming you have a relationship defined
    });

    return {
      applicationId: dbUpdatedApplication.id,
      name: dbUpdatedApplication.name,
      status: dbUpdatedApplication.status,
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

    const internApplication =
      await this.checkIsInternApplicationExist(applicationId);

    // Update the intern application status to deleted
    internApplication.is_deleted = true;
    const dbUpdatedApplication =
      await this.internApplicationRepository.save(internApplication);

    // Create history record
    await this.confirmedInternApplicationHistoryRepository.save({
      status: 'DELETED' as InternApplicationConfirmation,
      employee_id: employee.id, // Assuming you have a relation set up
      intern_application_id: dbUpdatedApplication.id,
    });

    return {
      applicationId: dbUpdatedApplication.id,
    };
  }
}
