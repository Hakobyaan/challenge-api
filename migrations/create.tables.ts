import { Pool } from "pg";
import "dotenv/config";

async function createTables() {
  const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT || 5432,
  });

  const client = await pool.connect();

  try {
    // SQL queries to create tables
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createFriendsTable = `
      CREATE TABLE IF NOT EXISTS friends (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        friend_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'accepted', 'declined'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createFriendRequestsTable = `
      CREATE TABLE IF NOT EXISTS friend_requests (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Run queries to create tables
    console.log("Running migration: Create tables");

    await client.query(createUsersTable);
    await client.query(createFriendsTable);
    await client.query(createFriendRequestsTable);

    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error during migration:", err);
  } finally {
    client.release(); // Release the client back to the pool
    await pool.end(); // Close the pool after the migration
  }
}

void createTables();
