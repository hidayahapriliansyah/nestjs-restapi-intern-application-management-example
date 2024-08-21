import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { ConfirmedInternApplicationHistory } from './confirmed-intern-application-history.entity';

export enum EmployeeRole {
  EMPLOYEE = 'EMPLOYEE',
  RECRUITER = 'RECRUITER',
}

@Entity('employees')
@Unique(['username'])
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: EmployeeRole, default: EmployeeRole.EMPLOYEE })
  role: EmployeeRole;

  @OneToMany(
    () => ConfirmedInternApplicationHistory,
    (history) => history.employee,
  )
  confirmedInternApplicationHistory: ConfirmedInternApplicationHistory[];
}
