import { Pool } from "pg";
import "dotenv/config";

async function dropTables() {
  const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
  });

  const client = await pool.connect();

  try {
    // SQL queries to drop tables
    const dropFriendsRequestsTable = `DROP TABLE IF EXISTS friend_requests CASCADE;`;
    const dropFriendsTable = `DROP TABLE IF EXISTS friends CASCADE;`;
    const dropUsersTable = `DROP TABLE IF EXISTS users CASCADE;`;

    // Run queries to drop tables
    console.log("Running migration: Drop tables");

    await client.query(dropFriendsRequestsTable);
    await client.query(dropFriendsTable);
    await client.query(dropUsersTable);

    console.log("Tables dropped successfully.");
  } catch (err) {
    console.error("Error during migration:", err);
  } finally {
    client.release(); // Release the client back to the pool
    await pool.end(); // Close the pool after the migration
  }
}

void dropTables();
