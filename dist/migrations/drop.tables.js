"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
async function dropTables() {
    const pool = new pg_1.Pool({
        user: process.env.PSQL_USER,
        host: process.env.PSQL_HOST,
        database: process.env.PSQL_DATABASE,
        password: process.env.PSQL_PASSWORD,
        port: process.env.PSQL_PORT,
    });
    const client = await pool.connect();
    try {
        const dropFriendsRequestsTable = `DROP TABLE IF EXISTS friend_requests CASCADE;`;
        const dropFriendsTable = `DROP TABLE IF EXISTS friends CASCADE;`;
        const dropUsersTable = `DROP TABLE IF EXISTS users CASCADE;`;
        console.log("Running migration: Drop tables");
        await client.query(dropFriendsRequestsTable);
        await client.query(dropFriendsTable);
        await client.query(dropUsersTable);
        console.log("Tables dropped successfully.");
    }
    catch (err) {
        console.error("Error during migration:", err);
    }
    finally {
        client.release();
        await pool.end();
    }
}
void dropTables();
//# sourceMappingURL=drop.tables.js.map