import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as request from 'supertest';
import { Logger } from 'winston';

import { AppModule } from '../src/app/app.module';
import { JwtService } from '../src/common/jwt.service';
import { PayloadDataEmployeeAccessToken } from '../src/core/types/payload.type';
import { E2EModule } from './e2e.module';
import { E2EService } from './e2e.service';

describe('InternController (e2e)', () => {
  let app: INestApplication;
  let e2eService: E2EService;
  let logger: Logger;
  let jwtService: JwtService;
  let configService: ConfigService;
  let cookieName: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, E2EModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    e2eService = app.get(E2EService);
    jwtService = app.get(JwtService);
    configService = app.get(ConfigService);
    cookieName = configService.get('cookie.employeeAccessTokenCookieName');
  });

  describe('GET /api/applications/intern', () => {
    beforeEach(async () => {
      await e2eService.createEmployeeWithRoleEmployee();
      await e2eService.createEmployeeWithRoleRecruiter();
      await e2eService.createInterApplicationFirmansyah();
      await e2eService.createInterApplicationHidayah();
    });

    afterEach(async () => {
      await e2eService.deleteAllEmployee();
      await e2eService.deleteAllInternApplication();
    });

    it('should response unauthenticated if user have no access token cookie', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/applications/intern');

      console.log('response.body =>', response.body);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Unauthenticated user. Please login.');
      expect(response.body.errors).toBeDefined();
    });

    // eslint-disable-next-line max-len
    it('should response unauthenticated if user have access token cookie with invalid value', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/applications/intern')
        .set('Cookie', 'itscookiname=wrong');

      console.log('response.body =>', response.body);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Unauthenticated user. Please login.');
      expect(response.body.errors).toBeDefined();
    });

    it('should unauthorized if employee is not recruiter', async () => {
      const employee = await e2eService.getEmployeeWithRoleEmployee();
      const token = jwtService.create<PayloadDataEmployeeAccessToken>({ id: employee.id });

      const response = await request(app.getHttpServer())
        .get('/api/applications/intern')
        .set('Cookie', `${cookieName}=${token}`);

      console.log('response.body =>', response.body);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Forbidden to access resource.');
      expect(response.body.errors).toBe('User is not recruiter');
    });

    it('should error query is invalid', async () => {
      const employee = await e2eService.getEmployeeWithRoleRecruiter();
      const token = jwtService.create<PayloadDataEmployeeAccessToken>({ id: employee.id });

      const response = await request(app.getHttpServer())
        .get('/api/applications/intern')
        .set('Cookie', `${cookieName}=${token}`)
        .query({
          limit: 'a',
          page: 'a',
          name: '',
        });

      console.log('response.body =>', response.body);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation Error.');
      expect(response.body.errors).toBe('Validation failed (numeric string is expected)');
    });

    it('should give intern application with correct name base on query', async () => {
      const employee = await e2eService.getEmployeeWithRoleRecruiter();
      const token = jwtService.create<PayloadDataEmployeeAccessToken>({ id: employee.id });

      const response = await request(app.getHttpServer())
        .get('/api/applications/intern')
        .set('Cookie', `${cookieName}=${token}`)
        .query({
          name: 'hidayah',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Success to get intern applications.');
      expect(response.body.data.applications[0].name).toContain('Hidayah');
      expect(response.body.data.paging.current_page).toBe(1);
      expect(response.body.data.paging.total_page).toBe(1);
      expect(response.body.data.paging.total_data).toBe(1);
      expect(response.body.data.paging.limit_data).toBe(10);
    });

    it('should give intern application with correct paging base on query', async () => {
      const employee = await e2eService.getEmployeeWithRoleRecruiter();
      const token = jwtService.create<PayloadDataEmployeeAccessToken>({ id: employee.id });

      const response = await request(app.getHttpServer())
        .get('/api/applications/intern')
        .set('Cookie', `${cookieName}=${token}`)
        .query({
          limit: '1',
          page: '2',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Success to get intern applications.');
      expect(response.body.data.applications.length).toBe(1);
      expect(response.body.data.paging.current_page).toBe(2);
      expect(response.body.data.paging.total_page).toBe(2);
      expect(response.body.data.paging.total_data).toBe(2);
      expect(response.body.data.paging.limit_data).toBe(1);
    });
  });
});
