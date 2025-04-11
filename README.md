# Project Hera

## Getting Started

To start the application, follow these steps:

1.  **Clean up Docker resources (optional but recommended):**

    ```bash
    docker system prune -af
    ```

2.  **Start the application containers:**

    ```bash
    docker compose up
    ```

3.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

4.  **Push database schema changes:**

    ```bash
    pnpm dn:push
    ```

5.  **Open Prisma Studio (optional, for database inspection):**
    ```bash
    pnpm studio
    ```

Once the containers are up and running, the application should be accessible in your browser (check the `docker-compose.yml` or application logs for the specific port, usually http://localhost:5173 or similar).
