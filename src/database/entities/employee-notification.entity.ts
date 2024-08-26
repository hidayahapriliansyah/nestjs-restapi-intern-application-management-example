import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Employee } from './employee.entity';

@Entity('employee_notifications')
export class EmployeeNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn(
    { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
  )
  updated_at: Date;

  @Column({ type: 'uuid' })
  employee_id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @ManyToOne(
    () => Employee,
    (employee) => employee.notification,
  )
  employee: Employee;
}