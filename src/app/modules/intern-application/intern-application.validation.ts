import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';

import { InternApplicationStatus } from '../../../database/entities/intern-application.entity';

export class GetApplicationsInternRequestQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  page?: number;
}

export class ConfirmApplicationInternRequestBodyDto {
  @IsEnum(InternApplicationStatus)
  status: 'ACCEPTED' | 'REJECTED';
}
