import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InternApplication } from '../entities/intern-application.entity';

@Injectable()
export class InternApplicationRepository {
  constructor(
    @InjectRepository(InternApplication)
    private readonly repository: Repository<InternApplication>,
  ) { }

  async findAllAndCountWithFilter(filter: {
    name?: string;
    page?: number;
    limit?: number;
  }): Promise<[InternApplication[], number]> {
    const { name, page, limit } = filter;

    const queryBuilder = this.repository
      .createQueryBuilder('internApplication')
      .where('internApplication.is_deleted = :isDeleted', { isDeleted: false });

    if (name && name !== '') {
      queryBuilder.andWhere('internApplication.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.take(limit).skip((page - 1) * limit);

    return await queryBuilder.getManyAndCount();
  }

  async findOneById(id: string): Promise<InternApplication | null> {
    try {
      return await this.repository.findOne({
        where: { id, is_deleted: false },
      });
    } catch (error) {
      if (
        (error as Error).message.includes('invalid input syntax for type uuid:')
      ) {
        return null;
      }
    }
  }

  async findAll(query): Promise<[InternApplication[], number]> {
    return this.repository.findAndCount(query);
  }

  async update({ where, data }: {
    where: Partial<InternApplication>;
    data: Partial<InternApplication>;
  }): Promise<InternApplication | null> {
    try {
      const application = await this.repository.findOneBy(where);

      if (!application) {
        return null;
      }

      const updatedApplication = Object.assign(application, data);

      return this.repository.save(updatedApplication);
    } catch (error) {
      if (
        (error as Error).message.includes('invalid input syntax for type uuid:')
      ) {
        return null;
      }
    }
  }
}
