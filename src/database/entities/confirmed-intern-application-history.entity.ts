import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from './employee.entity';
import { InternApplication } from './intern-application.entity';

export enum InternApplicationConfirmation {
  DELETED = 'DELETED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity('confirmed_intern_application_histories')
export class ConfirmedInternApplicationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'uuid' })
  intern_application_id: string;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'enum', enum: InternApplicationConfirmation })
  status: InternApplicationConfirmation;

  @ManyToOne(
    () => Employee,
    (employee) => employee.confirmedInternApplicationHistory,
  )
  employee: Employee;

  @ManyToOne(
    () => InternApplication,
    (internApplication) => internApplication.confirmedInternApplicationHistory,
  )
  internApplication: InternApplication;
}
