# Project Hera

A full-stack application built with modern web technologies, featuring a React frontend and Node.js backend with PostgreSQL database.

## Project Overview

Project Hera is a full-stack application consisting of:

- **Frontend**: React application with Vite, TanStack Router, and tRPC
- **Backend**: Node.js application with Express, tRPC, and Drizzle ORM
- **Database**: PostgreSQL with Drizzle ORM

## Tech Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **State Management**: React Query
- **API Client**: tRPC
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod

### Backend

- **Runtime**: Node.js
- **Framework**: Express
- **API**: tRPC
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Validation**: Zod

### Infrastructure

- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Package Manager**: pnpm

## Project Structure

```
project-hera/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Public assets
│   └── package.json  # Frontend dependencies
├── backend/          # Node.js backend application
│   ├── src/          # Source code
│   └── package.json  # Backend dependencies
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- pnpm (optional, for local development)

### Development with Docker

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project-hera
   ```

2. Start the development environment:

   ```bash
   docker-compose up
   ```

3. Access the applications:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - Database: localhost:5432

### Local Development

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Docker Services

The application consists of three main services:

### Frontend Service

- Port: 5173
- Hot-reloading enabled
- Mounts local code for development

### Backend Service

- Port: 3000
- Hot-reloading enabled
- Connects to PostgreSQL database

### Database Service

- PostgreSQL 16 (Alpine)
- Port: 5432
- Persistent volume for data storage
- Default credentials:
  - User: postgres
  - Password: postgres
  - Database: doctor_otter

## Environment Variables

### Frontend

Create a `.env` file in the frontend directory with necessary variables.

### Backend

Create a `.env` file in the backend directory with:

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Backend server port (default: 3000)

## Development Workflow

1. **Code Changes**

   - Frontend changes are hot-reloaded
   - Backend changes are hot-reloaded
   - Database schema changes require running migrations

2. **Database Management**

   - Use Drizzle Studio for database management:
     ```bash
     cd backend
     pnpm db:studio
     ```

3. **API Development**
   - tRPC provides type-safe API communication
   - API changes are reflected in both frontend and backend

## Production Deployment

1. Build the Docker images:

   ```bash
   docker-compose build
   ```

2. Start the production environment:
   ```bash
   docker-compose up -d
   ```

## Additional Documentation

For more detailed information about each part of the application, refer to:

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
