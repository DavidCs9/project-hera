# Backend Documentation

## Overview

This is a Node.js backend application built with Express, using tRPC for API endpoints and Drizzle ORM for database operations. The application uses PostgreSQL as its database.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **API**: tRPC
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Validation**: Zod
- **Package Manager**: pnpm
- **Storage**: AWS S3

## Project Structure

```
backend/
├── src/
│   ├── config/       # Configuration files (S3, etc.)
│   ├── db/           # Database configuration and schema
│   ├── routes/       # tRPC routes and procedures
│   ├── validation/   # Zod validation schemas
│   ├── server.ts     # Main server entry point
│   └── trpc.ts       # tRPC configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── .env              # Environment variables
```

## Key Files and Directories

### `src/server.ts`

Main entry point of the application. Configures Express server and tRPC middleware.

### `src/trpc.ts`

tRPC configuration and setup.

### `src/config/`

Contains configuration files for external services:

- S3 client configuration and setup
- Other service configurations

### `src/db/`

Contains database-related code:

- Database schema definitions
- Drizzle configuration
- Database connection setup

### `src/routes/`

tRPC routes and procedures organized by feature/module.

### `src/validation/`

Zod validation schemas for request/response data.

## Available Scripts

- `pnpm dev`: Start development server with hot reload
- `pnpm build`: Build the TypeScript project
- `pnpm start`: Start the production server
- `pnpm db:push`: Push database schema changes
- `pnpm db:studio`: Open Drizzle Studio for database management

## Environment Variables

The application requires the following environment variables (configured in `.env`):

- Database connection details
- Server configuration
- AWS S3 configuration:
  - `AWS_ACCESS_KEY_ID`: AWS access key
  - `AWS_SECRET_ACCESS_KEY`: AWS secret access key
  - `AWS_REGION`: AWS region
  - `S3_BUCKET_NAME`: S3 bucket name

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env` including AWS S3 credentials

3. Start development server:
   ```bash
   pnpm dev
   ```

## Database Management

- Use `pnpm db:push` to apply schema changes
- Use `pnpm db:studio` to open Drizzle Studio for database management

## API Documentation

The API is built with tRPC and can be explored using the tRPC client. All endpoints are type-safe and validated using Zod schemas.
