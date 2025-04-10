// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(connectionString);

const result = await db.execute("select 1");

console.log(result);

export default db;
