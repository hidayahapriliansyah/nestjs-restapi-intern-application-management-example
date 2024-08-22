import { IsEnum } from 'class-validator';

import { InternApplication } from '../../../database/entities/intern-application.entity';

export class ConfirmApplicationInternByIdRequest {
  @IsEnum(['ACCEPTED', 'REJECTED'], {
    message: 'Status must be either ACCEPTED or REJECTED',
  })
  status: 'ACCEPTED' | 'REJECTED';
}

export class GetApplicationInternDetailByIdResponse {
  id: InternApplication['id'];
  created_at: InternApplication['created_at'];
  updated_at: InternApplication['updated_at'];
  name: InternApplication['name'];
  choosen_field: InternApplication['choosen_field'];
  date_of_birth: InternApplication['date_of_birth'];
  university: InternApplication['university'];
  intern_duration: InternApplication['intern_duration'];
  status: InternApplication['status'];
}

export class GetApplicationsInternResponse {
  applications: GetApplicationInternDetailByIdResponse[];
  paging: {
    current_page: number;
    total_page: number;
    total_data: number;
    limit_data: number;
  };
}

export class DeleteApplicationInternResponse {
  applicationId: InternApplication['id'];
}

export type ConfirmApplicationInternResponse = {
  applicationId: InternApplication['id'];
  name: InternApplication['name'];
  status: 'ACCEPTED' | 'REJECTED';
};