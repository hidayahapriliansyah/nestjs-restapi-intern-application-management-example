import { Inject, Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { PrismaService } from '../../../common/prisma.service';
import { ValidationService } from '../../../common/validation.service';
import NotFound from '../../../core/exceptions/not-found';
import * as dto from './intern-application.dto';
import { getApplicationsInternRequestQuerySchema } from './intern-application.validation';

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
      where: { AND: filter },
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

  async getApplicationInternDetailById(
    employee: Employee,
    applicationId: string
  ): Promise<dto.GetApplicationInternDetailByIdResponse> {
    // eslint-disable-next-line max-len
    this.logger.info(`Employee with username: ${employee.username}, id: ${employee.id} access GET /api/applications/intern`);
    try {
      const dbInternApplication = await this.prismaService.internApplication.findUnique({
        where: {
          id: applicationId,
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
}
