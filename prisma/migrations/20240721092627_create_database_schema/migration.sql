-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('EMPLOYEE', 'RECRUITER');

-- CreateEnum
CREATE TYPE "InternApplicationStatus" AS ENUM ('NEED_CONFIRMATION', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InternApplicationConfirmation" AS ENUM ('DELETED', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "EmployeeRole" NOT NULL DEFAULT 'EMPLOYEE',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intern_applications" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "choosen_field" VARCHAR(30) NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "university" VARCHAR(30) NOT NULL,
    "intern_duration" INTEGER NOT NULL,
    "status" "InternApplicationStatus" NOT NULL DEFAULT 'NEED_CONFIRMATION',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "intern_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "confirmed_intern_application_histories" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intern_application_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "status" "InternApplicationConfirmation" NOT NULL,

    CONSTRAINT "confirmed_intern_application_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_username_key" ON "employees"("username");

-- AddForeignKey
ALTER TABLE "confirmed_intern_application_histories" ADD CONSTRAINT "confirmed_intern_application_histories_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "confirmed_intern_application_histories" ADD CONSTRAINT "confirmed_intern_application_histories_intern_application__fkey" FOREIGN KEY ("intern_application_id") REFERENCES "intern_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
