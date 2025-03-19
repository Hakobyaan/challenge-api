"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let UsersRepository = class UsersRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async checkIfEmailExists(email) {
        const result = await this.pool.query("SELECT id FROM users WHERE email = $1", [email]);
        return result.rows.length > 0;
    }
    async createUser(user) {
        const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, age;
    `;
        const values = [
            user.first_name,
            user.last_name,
            user.email,
            user.password,
            user.age,
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }
    async searchUsers(criteria) {
        let query = "SELECT id, first_name, last_name, email, age FROM users WHERE 1=1";
        const values = [];
        if (criteria.first_name) {
            query += ` AND first_name ILIKE $${values.length + 1}`;
            values.push(`%${criteria.first_name}%`);
        }
        if (criteria.last_name) {
            query += ` AND last_name ILIKE $${values.length + 1}`;
            values.push(`%${criteria.last_name}%`);
        }
        if (criteria.age) {
            query += ` AND age = $${values.length + 1}`;
            values.push(criteria.age.toString());
        }
        const result = await this.pool.query(query, values);
        return result.rows;
    }
    async findByEmail(email) {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await this.pool.query(query, [email]);
        return result.rows[0];
    }
    async findOne(id) {
        const query = "SELECT * FROM users WHERE id = $1";
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
    async create(userData) {
        console.log("Creating user:", userData);
        const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        console.log(query, Object.values(userData));
        const result = await this.pool.query(query, Object.values(userData));
        return result.rows[0];
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DATABASE_POOL")),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object])
], UsersRepository);
//# sourceMappingURL=repository.js.map