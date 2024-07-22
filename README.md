# 🚀 REST API INTERN MANAGEMENT EXAMPLE

## 🛠 Tech Stack:
- [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
- [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/docs/)
- [![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/docs/)
- [![Zod](https://img.shields.io/badge/Zod-3C873A?style=flat-square&logo=java&logoColor=white)](https://zod.dev/)
- [![jsonwebtoken](https://img.shields.io/badge/JsonWebToken-000000?style=flat-square&logo=json-web-tokens&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken)

## 📖 Description
This is an example of a NestJS project with the following features:
- e2e testing
- Connected to a PostgreSQL database
- JWT token and cookie for authentication
- Zod Validation
- Middleware
- Guards
- Custom decorators
- Custom pipelines
- Filters
- Custom error handling

The scenario of the business logic is: 
- Employees can log in.
- Employees with a recruiter role can browse, accept, reject, and delete intern applications.

## 🗂 Project Structure

I was inspired by the article ["Marketplace Backend: NestJS SOLID principles and folder structure"](https://mobileappcircular.com/marketplace-backend-nestjs-solid-principles-and-folder-structure-82cc72a82490) on Medium, which helped me develop and maintain my NestJS project with a clean and smooth folder structure. Please read the article, it's truly excellent!

## 📄 API Specification

All of the API specifications for this project are written in the `docs` folder of this root project.

## 🚀 Running The Project

### Install the dependencies
```bash
$ npm install
```

### Running end-to-end testing
```bash
$ npm run test:e2e
```