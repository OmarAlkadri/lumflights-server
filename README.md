# Seed Data Service

The `SeedDataService` is responsible for populating the database with initial data, including users and reservations. It uses Firebase Firestore as the database.

## Features

- **Seed Users:** Creates an initial set of users with predefined roles and random data.
- **Seed Reservations:** Generates a collection of reservation data for testing.
- **Login Process:** Supports user authentication and login.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Seed Users](#seed-users)
4. [Seed Reservations](#seed-reservations)
5. [Login Process](#login-process)
6. [Models](#models)

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

The `onModuleInit` method in the `SeedDataService` will automatically seed users and reservations if they do not already exist.

## Seed Users

The `seedUsers` method creates a predefined admin user and additional random users. Admin roles are assigned to specific users as required.

### Example User Data

```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "name": "Admin User",
  "ERoles": ["Admin", "Manager", "Field", "Employee", "Supervisor"],
  "EUserType": "Admin",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

## Seed Reservations

The `seedReservations` method generates random reservation data, including customers, flight details, and comments.

### Example Reservation Data

```json
{
  "id": "unique-reservation-id",
  "flightId": "FL-1234",
  "fromWhereLocation": "New York",
  "toWhereLocation": "Los Angeles",
  "flightCompaniName": "Example Airlines",
  "date": "2025-01-01T12:00:00.000Z",
  "reservationDate": "2025-01-01T10:00:00.000Z",
  "customers": [
    {
      "id": "customer-id",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2025-01-01T09:00:00.000Z"
    }
  ],
  "comments": [
    {
      "id": "comment-id",
      "text": "Great flight!",
      "createdAt": "2025-01-01T15:00:00.000Z",
      "rating": 5,
      "userId": "customer-id",
      "flightId": "FL-1234"
    }
  ],
  "seatsBooked": 1,
  "status": "confirmed",
  "createdAt": "2025-01-01T08:00:00.000Z"
}
```

## Login Process

The application includes a basic login functionality to authenticate users.

### Login Endpoint

**POST** `/auth/login`

#### Request Body

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```


### Authentication Logic

The following steps are used for authentication:

1. Validate the user's email and password against the database.
2. Generate a JWT token for successful login.
3. Return the token and user details in the response.

## Models

### User Model

```typescript
export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    ERoles: string[];
    EUserType: string;
    createdAt: string;
}
```

### Reservation Model

```typescript
export interface IReservations {
    id: string;
    flightId: string;
    fromWhereLocation: string;
    toWhereLocation: string;
    flightCompaniName: string;
    date: string;
    reservationDate: string;
    customers: ICustomer[];
    comments: IComments[];
    seatsBooked: number;
    status: string;
    createdAt: string;
}

interface ICustomer {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

interface IComments {
    id: string;
    text: string;
    createdAt: string;
    rating: number;
    userId: string;
    flightId: string;
}
```

### Comment Model

```typescript
export interface IComments {
    id: string;
    text: string;
    createdAt: string;
    rating: number;
    userId: string;
    flightId: string;
}
```

### Roles Enum

```typescript
export enum ERoles {
    Admin = 'Admin',
    Manager = 'Manager',
    Field = 'Field',
    Employee = 'Employee',
    Supervisor = 'Supervisor'
}
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

