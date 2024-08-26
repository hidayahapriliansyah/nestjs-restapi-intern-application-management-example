import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeNotification1724637017113 implements MigrationInterface {
    name = 'AddEmployeeNotification1724637017113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_id" uuid NOT NULL, "description" text NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "employeeId" uuid, CONSTRAINT "PK_7dc7c1e084d51954de4aa19299b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_notifications" ADD CONSTRAINT "FK_e5f07cab7fae10e1cb945cfbb9a" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_notifications" DROP CONSTRAINT "FK_e5f07cab7fae10e1cb945cfbb9a"`);
        await queryRunner.query(`DROP TABLE "employee_notifications"`);
    }

}
