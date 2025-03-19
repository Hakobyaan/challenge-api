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
exports.FriendsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let FriendsRepository = class FriendsRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async sendFriendRequest(userId, friendId) {
        const query = `
      SELECT id FROM users WHERE id IN ($1, $2)
    `;
        const result = await this.pool.query(query, [userId, friendId]);
        if (result.rows.length < 2) {
            throw new common_1.NotFoundException("One or both users not found");
        }
        const insertQuery = `
      INSERT INTO friends (user_id, friend_id, status)
      VALUES ($1, $2, 'pending')
      RETURNING id, user_id, friend_id, status
    `;
        const insertResult = await this.pool.query(insertQuery, [userId, friendId]);
        return insertResult.rows[0];
    }
    async getFriendRequests(userId) {
        const query = `
      SELECT * FROM friends
      WHERE friend_id = $1 AND status = 'pending'
    `;
        const result = await this.pool.query(query, [userId]);
        return result.rows;
    }
    async respondToFriendRequest(requestId, status) {
        const query = `
      UPDATE friends
      SET status = $1
      WHERE id = $2
      RETURNING id, user_id, friend_id, status
    `;
        const result = await this.pool.query(query, [status, requestId]);
        if (result.rows.length === 0) {
            throw new common_1.NotFoundException("Friend request not found");
        }
        return result.rows[0];
    }
};
exports.FriendsRepository = FriendsRepository;
exports.FriendsRepository = FriendsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DATABASE_POOL")),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Pool !== "undefined" && pg_1.Pool) === "function" ? _a : Object])
], FriendsRepository);
//# sourceMappingURL=repository.js.map