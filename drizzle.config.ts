import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  dbCredentials: { url: process.env.DB_URL as string },
  verbose: true,
  strict: true,
});
