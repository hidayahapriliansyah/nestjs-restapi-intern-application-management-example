import { z } from 'zod';

import { InternApplication } from '../../../database/entities/intern-application.entity';
import { confirmApplicationInternRequestBodySchema } from './intern-application.validation';

export type GetApplicationInternDetailByIdResponse = {
  id: InternApplication['id'];
  created_at: InternApplication['created_at'];
  updated_at: InternApplication['updated_at'];
  name: InternApplication['name'];
  choosen_field: InternApplication['choosen_field'];
  date_of_birth: InternApplication['date_of_birth'];
  university: InternApplication['university'];
  intern_duration: InternApplication['intern_duration'];
  status: InternApplication['status'];
};

export type GetApplicationsInternResponse = {
  applications: GetApplicationInternDetailByIdResponse[];
  paging: {
    current_page: number;
    total_page: number;
    total_data: number;
    limit_data: number;
  };
};

export type ConfirmApplicationInternResponse = {
  applicationId: InternApplication['id'];
  name: InternApplication['name'];
  status: InternApplication['status'];
};

export type ConfirmApplicationInternByIdRequest =
  z.infer<typeof confirmApplicationInternRequestBodySchema>;

export type DeleteApplicationInternResponse = {
  applicationId: InternApplication['id'];
};