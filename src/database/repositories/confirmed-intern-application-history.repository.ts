import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import {
  ConfirmedInternApplicationHistory,
} from '../entities/confirmed-intern-application-history.entity';

@Injectable()
export class ConfirmedInternApplicationHistoryRepository {
  constructor(
    @InjectRepository(ConfirmedInternApplicationHistory)
    private readonly repository: Repository<ConfirmedInternApplicationHistory>,
  ) { }

  async save(
    history: DeepPartial<ConfirmedInternApplicationHistory>
  ): Promise<ConfirmedInternApplicationHistory> {
    return await this.repository.save(history);
  }
}
