# Lumflights Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

---

## Description

Lumflights Server is built using the [NestJS](https://nestjs.com) framework. It follows Clean Architecture principles combined with Domain-Driven Design (DDD), ensuring scalability, maintainability, and testability.

---

## Installation

To install dependencies, run the following command:

```bash
npm install -g pnpm
```

---

## Running the Application

The application can be run in various modes:

```bash
# Development mode
pnpm run start

# Watch mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

---

## Testing

Commands for testing the application:

```bash
# Unit tests
pnpm run test

# End-to-end (e2e) tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

---

## Project Structure

This project adheres to Clean Architecture principles integrated with DDD.

### Folder Structure

```plaintext
project-root/
├── config/
│   ├── env/
│   │   ├── development.yaml
│   │   ├── production.yaml
│   │   └── testing.yaml
│   └── app-config.ts
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── aggregates/
│   │   └── repositories/
│   ├── application/
│   │   ├── use-cases/
│   │   ├── dtos/
│   │   └── interfaces/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── database/
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middlewares/
│   └── shared/
│       ├── utils/
│       ├── constants/
│       └── types/
└── README.md
```

---

## Explanation of Layers

1. **Config**: Centralized application configurations and environment variables.

2. **Domain**:
   - **Entities**: Core business objects with attributes and behaviors.
   - **Value Objects**: Immutable domain concepts.
   - **Aggregates**: A collection of entities treated as a single unit.
   - **Repositories**: Interfaces for data access abstraction.

3. **Application**:
   - **Use Cases**: Encapsulation of application-specific business logic.
   - **DTOs**: Data Transfer Objects between layers.
   - **Interfaces**: Contracts for services.

4. **Infrastructure**:
   - **Repositories**: Implementation of repository interfaces.
   - **Services**: Communication with external APIs or integrations.
   - **Database**: ORM setup and migrations.

5. **Presentation**:
   - **Controllers**: Handle requests and call use cases.
   - **Routes**: Define API endpoints.
   - **Middlewares**: Apply cross-cutting concerns like logging.

6. **Shared**:
   - Common utilities, constants, and types shared across the project.

---

## Support

NestJS is an MIT-licensed open-source project supported by sponsors and contributors. Learn how to support [here](https://docs.nestjs.com/support).

---

## Stay in Touch

- **Author**: [Kamil Myśliwiec](https://kamilmysliwiec.com)
- **Website**: [NestJS](https://nestjs.com)
- **Twitter**: [@nestframework](https://twitter.com/nestframework)

---

## License

This project is [MIT licensed](LICENSE).

