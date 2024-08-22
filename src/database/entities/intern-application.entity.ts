import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConfirmedInternApplicationHistory } from './confirmed-intern-application-history.entity';

export enum InternApplicationStatus {
  NEED_CONFIRMATION = 'NEED_CONFIRMATION',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity('intern_applications')
export class InternApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  choosen_field: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 30 })
  university: string;

  @Column({ type: 'int' })
  intern_duration: number;

  @Column({
    type: 'enum',
    enum: InternApplicationStatus,
    default: InternApplicationStatus.NEED_CONFIRMATION,
  })
  status: InternApplicationStatus;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @OneToMany(
    () => ConfirmedInternApplicationHistory,
    (history) => history.internApplication,
  )
  confirmedInternApplicationHistory: ConfirmedInternApplicationHistory[];
}
