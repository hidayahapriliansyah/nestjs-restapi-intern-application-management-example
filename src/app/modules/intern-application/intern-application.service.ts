import { Inject, Injectable } from '@nestjs/common';
import { Employee, InternApplication, Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { PrismaService } from '../../../common/prisma.service';
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
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) { }

  async getApplicationsIntern(
    employee: Employee,
    { name, limit = 10, page = 1 }: {
      name?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<dto.GetApplicationsInternResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(`Employee with username: ${employee.username}, id: ${employee.id} access GET /api/applications/intern`);

    const query = this.validationService
      .validate(getApplicationsInternRequestQuerySchema, { name, limit, page });

    const filter: Prisma.InternApplicationWhereInput[] = [];

    if (name && name !== '') {
      filter.push({
        OR: [{ name: { contains: name, mode: 'insensitive' } }],
      });
    }

    const dbInternApplications = await this.prismaService.internApplication.findMany({
      where: { is_deleted: false, AND: filter },
      take: limit,
      skip: (query.page - 1) * query.limit,
    });

    const totalData = await this.prismaService.internApplication.count({
      where: { AND: filter },
    });

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
    applicationId: string
  ): Promise<InternApplication> {
    try {
      const dbInternApplication = await this.prismaService.internApplication.findUnique({
        where: {
          id: applicationId,
          is_deleted: false,
        },
      });

      if (!dbInternApplication) {
        throw new NotFound(
          'Intern application is not found.',
          `Intern application with id ${applicationId} is not found.`
        );
      }
      return dbInternApplication;
    } catch (error) {
      if ((error as Error).message.includes('Error creating UUID')) {
        throw new NotFound(
          'Intern application is not found.',
          `Intern application with id ${applicationId} is not found.`
        );
      }
      throw error as Error;
    }
  }

  async getApplicationInternDetailById(
    employee: Employee,
    applicationId: string
  ): Promise<dto.GetApplicationInternDetailByIdResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(`Employee with username: ${employee.username}, id: ${employee.id} access GET /api/applications/intern/:applicationId`);
    const internApplication = await this.checkIsInternApplicationExist(applicationId);
    return internApplication;
  }

  async confirmApplicationInternDetailById(
    employee: Employee,
    applicationId: string,
    body: dto.ConfirmApplicationInternByIdRequest,
  ): Promise<dto.ConfirmApplicationInternResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(`Employee with username: ${employee.username}, id: ${employee.id} access PATCH /api/applications/intern/:applicationId`);

    const internApplication = await this.checkIsInternApplicationExist(applicationId);

    const bodyReq = this.validationService
      .validate(confirmApplicationInternRequestBodySchema, body);

    if (internApplication.status !== 'NEED_CONFIRMATION') {
      throw new BadRequest(
        'Application already confirmed.',
        // eslint-disable-next-line max-len
        `Application with id: ${applicationId} already confirmed with status ${internApplication.status}`
      );
    }

    const dbUpdatedApplication = await this.prismaService.internApplication.update({
      where: { id: internApplication.id },
      data: { status: bodyReq.status },
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
    // eslint-disable-next-line max-len
    this.logger.info(`Employee with username: ${employee.username}, id: ${employee.id} access DELETE /api/applications/intern/:applicationId`);

    const internApplication = await this.checkIsInternApplicationExist(applicationId);

    await this.prismaService.internApplication.update({
      where: { id: internApplication.id },
      data: { is_deleted: true },
    });

    return {
      applicationId: internApplication.id,
    };
  }
}
