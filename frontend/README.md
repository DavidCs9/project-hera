# Frontend Documentation

## Overview

This is a modern React frontend application built with Vite, using TanStack Router for routing and tRPC for API communication. The application features a component-based architecture with TypeScript support and modern styling using Tailwind CSS.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **State Management**: React Query
- **API Client**: tRPC
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Package Manager**: pnpm

## Project Structure

```
frontend/
├── src/
│   ├── assets/       # Static assets (images, fonts, etc.)
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions and shared logic
│   ├── routes/       # Application routes and pages
│   ├── utils/        # Helper functions and utilities
│   ├── App.css       # Global styles
│   ├── index.css     # Tailwind CSS imports
│   ├── main.tsx      # Application entry point
│   └── routeTree.gen.ts # Generated route tree
├── public/           # Public assets
├── components.json   # UI components configuration
├── vite.config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```

## Key Files and Directories

### `src/main.tsx`

Application entry point. Sets up the React application with necessary providers and routing.

### `src/routes/`

Contains all application routes and pages, organized by feature/module.

### `src/components/`

Reusable UI components built with Radix UI and styled with Tailwind CSS.

### `src/lib/`

Shared utilities and configurations:

- API client setup
- Theme configuration
- Common hooks and utilities

### `src/utils/`

Helper functions and utilities used across the application.

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build the application for production
- `pnpm preview`: Preview the production build locally
- `pnpm lint`: Run ESLint for code quality checks

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm dev
   ```

3. For production build:
   ```bash
   pnpm build
   pnpm preview
   ```

## Features

- **Type Safety**: Full TypeScript support throughout the application
- **Modern Routing**: File-based routing with TanStack Router
- **API Integration**: Type-safe API calls with tRPC
- **Form Handling**: Robust form management with React Hook Form and Zod validation
- **Styling**: Utility-first CSS with Tailwind
- **UI Components**: Accessible components from Radix UI
- **Theme Support**: Dark/light mode with next-themes

## Environment Setup

The application uses environment variables for configuration. Create a `.env` file in the root directory with necessary variables.

## Code Quality

- ESLint for code linting
- TypeScript for type checking
- Prettier for code formatting (if configured)

## API Integration

The frontend communicates with the backend using tRPC, providing:

- Type-safe API calls
- Automatic request/response type inference
- Built-in error handling
- React Query integration for data fetching
