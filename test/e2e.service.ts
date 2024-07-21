import { Injectable } from '@nestjs/common';

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
        name: 'Adi Muhamad Firmansyah',
        password: await this.bcyptService.hash('password'),
        username: 'employee',
        role: 'EMPLOYEE',
      },
    });
  }

  async createEmployeeWithRoleRecruiter() {
    await this.prismaService.employee.create({
      data: {
        name: 'Adi Hidayah Apriliansyah',
        password: await this.bcyptService.hash('password'),
        username: 'recruiter',
        role: 'RECRUITER',
      },
    });
  }

  async deleteAllEmployee() {
    await this.prismaService.employee.deleteMany();
  }
}