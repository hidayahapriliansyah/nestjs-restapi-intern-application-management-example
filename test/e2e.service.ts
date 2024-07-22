import { Injectable } from '@nestjs/common';
import { ConfirmedInternApplicationHistory, Employee, InternApplication } from '@prisma/client';

import { BcryptService } from '../src/common/bcrypt.service';
import { PrismaService } from '../src/common/prisma.service';

@Injectable()
export class E2EService {
  constructor(
    private prismaService: PrismaService,
    private bcyptService: BcryptService,
  ) { }

  async createEmployeeWithRoleEmployee() {
    await this.prismaService.employee.create({
      data: {
        name: 'Employee',
        password: await this.bcyptService.hash('password'),
        username: 'employee',
        role: 'EMPLOYEE',
      },
    });
  }

  async createEmployeeWithRoleRecruiter() {
    await this.prismaService.employee.create({
      data: {
        name: 'Recruiter',
        password: await this.bcyptService.hash('password'),
        username: 'recruiter',
        role: 'RECRUITER',
      },
    });
  }

  async deleteAllEmployee() {
    await this.prismaService.employee.deleteMany({});
  }

  async createInterApplicationFirmansyah() {
    await this.prismaService.internApplication.create({
      data: {
        choosen_field: 'Backend Engineer',
        date_of_birth: new Date('2001-04-25'),
        intern_duration: 3,
        name: 'Adi Muhamad Firmansyah',
        university: 'STMIK DCI',
      },
    });
  }

  async createInterApplicationHidayah() {
    await this.prismaService.internApplication.create({
      data: {
        choosen_field: 'Backend Engineer',
        date_of_birth: new Date('2001-04-25'),
        intern_duration: 3,
        name: 'Adi Hidayah Apriliansyah',
        university: 'STMIK DCI',
      },
    });
  }

  async createAcceptedInterApplicationHidayah(): Promise<InternApplication> {
    return await this.prismaService.internApplication.create({
      data: {
        choosen_field: 'Backend Engineer',
        date_of_birth: new Date('2001-04-25'),
        intern_duration: 3,
        name: 'Adi Hidayah Apriliansyah',
        university: 'STMIK DCI',
        status: 'ACCEPTED',
      },
    });
  }

  async deleteAllInternApplication() {
    await this.prismaService.internApplication.deleteMany({});
  }

  async getEmployeeWithRoleEmployee(): Promise<Employee> {
    return await this.prismaService.employee.findFirst({
      where: { role: 'EMPLOYEE' },
    });
  }

  async getEmployeeWithRoleRecruiter(): Promise<Employee> {
    return await this.prismaService.employee.findFirst({
      where: { role: 'RECRUITER' },
    });
  }

  async getInternApplication(): Promise<InternApplication> {
    return await this.prismaService.internApplication.findFirst({
      where: {
        is_deleted: false,
      },
    });
  }

  async getAcceptedInternApplication(): Promise<InternApplication> {
    return await this.prismaService.internApplication.findFirst({
      where: { status: 'ACCEPTED', is_deleted: false },
    });
  }

  async getInternApplicationById(id: string): Promise<InternApplication | null> {
    try {
      const dbInternApplication = await this.prismaService.internApplication.findUnique({
        where: { id, is_deleted: false },
      });
      return dbInternApplication;
    } catch (error) {
      return null;
    }
  }

  async getConfirmationInternApplicationHistory(): Promise<ConfirmedInternApplicationHistory> {
    return await this.prismaService.confirmedInternApplicationHistory.findFirst();
  }

  async deleteAllConfirmationInternApplicationHistory() {
    return await this.prismaService.confirmedInternApplicationHistory.deleteMany();
  }
}