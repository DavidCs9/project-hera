FROM node:20-alpine

# Install postgresql-client for pg_isready
RUN apk add --no-cache postgresql-client

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install pnpm globally and then install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile
# Copy the rest of the application code
COPY . .

# Expose the backend port (assuming 3000 from docker-compose)
EXPOSE 3000

# Default command for the entrypoint script (will be executed by exec "$@")
CMD ["pnpm", "dev"] 