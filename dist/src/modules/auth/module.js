"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const controller_1 = require("./controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const repository_1 = require("./repository");
const passport_1 = require("@nestjs/passport");
const module_1 = require("../users/module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || "secret",
                signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h" },
            }),
            (0, common_1.forwardRef)(() => module_1.UsersModule),
        ],
        providers: [service_1.AuthService, repository_1.AuthRepository, jwt_strategy_1.JwtStrategy],
        controllers: [controller_1.AuthController],
        exports: [service_1.AuthService, repository_1.AuthRepository],
    })
], AuthModule);
//# sourceMappingURL=module.js.map