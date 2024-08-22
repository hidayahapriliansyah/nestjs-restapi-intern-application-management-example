import { IsString, Length } from 'class-validator';

export class EmployeeSignInRequest {
  @IsString()
  @Length(1, 30)
  username: string;

  @IsString()
  @Length(6, 255)
  password: string;
}
