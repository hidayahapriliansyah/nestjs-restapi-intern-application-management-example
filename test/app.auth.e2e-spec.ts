import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as request from 'supertest';
import { Logger } from 'winston';

import { AppModule } from '../src/app/app.module';
import { E2EModule } from './e2e.module';
import { E2EService } from './e2e.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let e2eService: E2EService;
  let logger: Logger;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, E2EModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    e2eService = app.get(E2EService);
  });

  describe('POST /api/auth', () => {
    beforeEach(async () => {
      await e2eService.createEmployeeWithRoleRecruiter();
    });

    afterEach(async () => {
      await e2eService.deleteAllEmployee();
    });

    it('should not have set-cookie headers and login response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth')
        .send({
          username: 'recruite',
          password: 'passwor',
        });

      logger.info(response);

      expect(response.status).toBe(401);
      expect(response.headers['set-cookie']).toBeUndefined();
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Unauthenticated user. Please login.');
      expect(response.body.errors).toBeDefined();
    });

    it('should have set-cookie headers and login response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth')
        .send({
          username: 'recruiter',
          password: 'password',
        });

      logger.info(response);

      expect(response.status).toBe(200);
      const setCookieHeader = response.headers['set-cookie'] as unknown as string[];
      const cookieNames = ['itscookiename'];
      cookieNames.forEach(cookieName => {
        const found = setCookieHeader.some(cookie => cookie.startsWith(`${cookieName}=`));
        expect(found).toBeTruthy();
      });
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successfully.');
      expect(response.body.data.userId).toBeDefined();
    });
  });
});
