# ./frontend/Dockerfile
# NOTE: Assumes build context is the monorepo root (context: .)
# NOTE: Assumes NO root package.json/pnpm-lock.yaml

FROM node:20-alpine

# Set a base working directory
WORKDIR /app

# Copy the *entire* build context (including frontend/ and backend/ folders)
# from the host into the image's /app directory.
# Ensure a root .dockerignore prevents copying host node_modules, .git, etc.
COPY . .

# Navigate into the frontend directory *within the image*
WORKDIR /app/frontend

# Install pnpm globally within the container
RUN npm install -g pnpm

# Install dependencies using the frontend's package.json and pnpm-lock.yaml
# Make sure frontend/pnpm-lock.yaml exists on your host machine!
# If not, run 'npx pnpm install' inside the ./frontend directory on your host.
RUN pnpm install --frozen-lockfile

# Expose the Vite port
EXPOSE 5173

# Define the default command (will be run from /app/frontend)
CMD ["pnpm", "run", "dev", "--host"]
