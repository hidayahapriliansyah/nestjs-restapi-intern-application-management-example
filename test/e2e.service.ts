import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BcryptService } from '../src/common/bcrypt.service';
import {
  ConfirmedInternApplicationHistory,
} from '../src/database/entities/confirmed-intern-application-history.entity';
import { Employee, EmployeeRole } from '../src/database/entities/employee.entity';
import {
  InternApplication,
  InternApplicationStatus,
} from '../src/database/entities/intern-application.entity';

@Injectable()
export class E2EService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(InternApplication)
    private internApplicationRepository: Repository<InternApplication>,
    @InjectRepository(ConfirmedInternApplicationHistory)
    private confirmedInternApplicationHistoryRepository: Repository<
      ConfirmedInternApplicationHistory
    >,
    private bcyptService: BcryptService,
  ) { }

  async createEmployeeWithRoleEmployee() {
    const newEmployee = this.employeeRepository.create({
      name: 'Employee',
      password: await this.bcyptService.hash('password'),
      username: 'employee',
      role: EmployeeRole.EMPLOYEE,
    });

    const savedEmployee = await this.employeeRepository.save(newEmployee);
    return savedEmployee;
  }

  async createEmployeeWithRoleRecruiter() {
    const newEmployee = this.employeeRepository.create({
      name: 'Recruiter',
      password: await this.bcyptService.hash('password'),
      username: 'recruiter',
      role: EmployeeRole.RECRUITER,
    });

    const savedEmployee = await this.employeeRepository.save(newEmployee);

    return savedEmployee;
  }

  async deleteAllEmployee() {
    await this.employeeRepository.delete({});
  }

  async createInterApplicationFirmansyah() {
    const newInternApplication = this.internApplicationRepository.create({
      choosen_field: 'Backend Engineer',
      date_of_birth: new Date('2001-04-25'),
      intern_duration: 3,
      name: 'Adi Muhamad Firmansyah',
      university: 'STMIK DCI',
    });

    const savedInternApplication =
      await this.internApplicationRepository.save(newInternApplication);

    return savedInternApplication;
  }

  async createInterApplicationHidayah() {
    const newInternApplication = this.internApplicationRepository.create({
      choosen_field: 'Backend Engineer',
      date_of_birth: new Date('2001-04-25'),
      intern_duration: 3,
      name: 'Adi Hidayah Apriliansyah',
      university: 'STMIK DCI',
    });

    const savedInternApplication =
      await this.internApplicationRepository.save(newInternApplication);

    return savedInternApplication;
  }

  async createAcceptedInterApplicationHidayah(): Promise<InternApplication> {
    return await this.internApplicationRepository.save({
      choosen_field: 'Backend Engineer',
      date_of_birth: new Date('2001-04-25'),
      intern_duration: 3,
      name: 'Adi Hidayah Apriliansyah',
      university: 'STMIK DCI',
      status: InternApplicationStatus.ACCEPTED,
    });
  }

  async deleteAllInternApplication() {
    await this.internApplicationRepository.delete({});
  }

  async getEmployeeWithRoleEmployee(): Promise<Employee> {
    return await this.employeeRepository.findOne({
      where: { role: EmployeeRole.EMPLOYEE },
    });
  }

  async getEmployeeWithRoleRecruiter(): Promise<Employee> {
    return await this.employeeRepository.findOne({
      where: {
        role: EmployeeRole.RECRUITER,
      },
    });
  }

  async getInternApplication(): Promise<InternApplication> {
    try {
      const internApplication = await this.internApplicationRepository.findOne({
        where: {
          is_deleted: false,
        },
      });
      return internApplication;
    } catch (error) {
      return null;
    }
  }

  async getInternApplicationById(
    id: string,
  ): Promise<InternApplication | null> {
    try {
      const dbInternApplication =
        await this.internApplicationRepository.findOneBy({
          id,
          is_deleted: false, // Assuming `is_deleted` is a column in your entity
        });
      return dbInternApplication;
    } catch (error) {
      return null;
    }
  }

  async getConfirmationInternApplicationHistory(): Promise<ConfirmedInternApplicationHistory> {
    try {
      // Using `find` with `take` to get the first record
      const confirmationHistory =
        await this.confirmedInternApplicationHistoryRepository.find({
          take: 1, // Limits the result to one entry
        });
      return confirmationHistory[0] || null;
    } catch (error) {
      return null;
    }
  }

  async deleteAllConfirmationInternApplicationHistory() {
    return await this.confirmedInternApplicationHistoryRepository.delete({});
  }
}
