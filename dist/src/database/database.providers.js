"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const pg_1 = require("pg");
exports.databaseProviders = [
    {
        provide: "DATABASE_POOL",
        useFactory: () => {
            try {
                const pool = new pg_1.Pool({
                    user: "postgres",
                    host: "localhost",
                    database: "social_media",
                    password: "1597",
                    port: 5432,
                });
                return pool;
            }
            catch (error) {
                console.error("Error creating database pool:", error);
                throw new Error("Failed to create database pool");
            }
        },
    },
];
//# sourceMappingURL=database.providers.js.map