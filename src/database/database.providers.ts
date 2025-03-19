import { Pool } from "pg";

export const databaseProviders = [
  {
    provide: "DATABASE_POOL",
    useFactory: (): Pool => {
      try {
        const pool = new Pool({
          user: "postgres",
          host: "localhost",
          database: "social_media",
          password: "1597",
          port: 5432,
        });
        return pool;
      } catch (error: unknown) {
        console.error("Error creating database pool:", error);
        throw new Error("Failed to create database pool");
      }
    },
  },
];
