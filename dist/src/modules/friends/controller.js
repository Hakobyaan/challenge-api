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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("./service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FriendsController = class FriendsController {
    friendsService;
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    async sendFriendRequest(body) {
        return await this.friendsService.sendFriendRequest(body.userId, body.friendId);
    }
    async getFriendRequests(userId) {
        return await this.friendsService.getFriendRequests(userId);
    }
    async respondToFriendRequest(requestId, status) {
        const result = await this.friendsService.respondToFriendRequest(requestId, status);
        return result;
    }
};
exports.FriendsController = FriendsController;
__decorate([
    (0, common_1.Post)("request"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Send a friend request" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                userId: { type: "number", example: 1 },
                friendId: { type: "number", example: 2 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Friend request sent successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Get)("requests/:userId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get friend requests for a user" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of friend requests" }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriendRequests", null);
__decorate([
    (0, common_1.Post)("respond/:requestId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Respond to a friend request" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                status: { type: "string", example: "accepted" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Friend request updated successfully",
    }),
    __param(0, (0, common_1.Param)("requestId")),
    __param(1, (0, common_1.Body)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "respondToFriendRequest", null);
exports.FriendsController = FriendsController = __decorate([
    (0, swagger_1.ApiTags)("Friends"),
    (0, common_1.Controller)("friends"),
    __metadata("design:paramtypes", [service_1.FriendsService])
], FriendsController);
//# sourceMappingURL=controller.js.map