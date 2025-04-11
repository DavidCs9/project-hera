FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install pnpm globally and then install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile
# Copy the rest of the application code
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Run the development server, accessible from outside the container
CMD ["pnpm", "dev", "--host"] 