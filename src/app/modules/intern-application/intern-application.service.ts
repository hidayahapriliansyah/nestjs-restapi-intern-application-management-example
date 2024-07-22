import { Inject, Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { PrismaService } from '../../../common/prisma.service';
import { ValidationService } from '../../../common/validation.service';
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

    console.warn('name =>', name);

    if (name && name !== '') {
      filter.push({
        OR: [{ name: { contains: name, mode: 'insensitive' } }],
      });
    }

    console.warn('filter =>', filter);

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
}
