import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app/app.module';
import { E2EModule } from './e2e.module';
import { E2EService } from './e2e.service';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let e2eService: E2EService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, E2EModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    e2eService = app.get(E2EService);
  });

  describe('POST /api/employess', () => {
    beforeEach(async () => {
      await e2eService.createEmployeeWithRoleRecruiter();
    });

    afterEach(async () => {
      await e2eService.deleteAllEmployee();
    });

    // should error if input invalid
    it('should error if input invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          username: 'ssdf',
          password: 'pas',
        });

      console.log('response.body =>', response.body);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
      expect(response.body.errors).toBeDefined();
    });

    // should error if username is already used
    it('should error if username is already used', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          name: 'Recruiter',
          password: 'password',
          username: 'recruiter',
          role: 'RECRUITER',
        });

      console.log('response.body =>', response.body);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
      expect(response.body.errors).toBeDefined();
    });

    // should success and return valid
    it('should success and return valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/employees')
        .send({
          name: 'New Recruiter',
          password: 'password',
          username: 'new_recruiter',
          role: 'RECRUITER',
        });

      console.log('response.body =>', response.body);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBeDefined();
      expect(Object.keys(response.body.data).length).toBe(3);
      expect(response.body.data.employeeId).toBeDefined();
      expect(response.body.data.name).toBe('New Recruiter');
      expect(response.body.data.role).toBe('RECRUITER');
    });
  });
});
