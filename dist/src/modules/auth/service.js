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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const repository_1 = require("./repository");
let AuthService = class AuthService {
    authRepository;
    jwtService;
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    generateTokens(userId, email) {
        const payload = { email, sub: userId };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
        });
        return { accessToken, refreshToken };
    }
    async register(createUserDto) {
        const existingUser = await this.authRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = await this.authRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.generateTokens(newUser.id, newUser.email);
    }
    async login(req, loginUserDto) {
        const user = await this.authRepository.findByEmail(loginUserDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const { accessToken, refreshToken } = this.generateTokens(user.id, user.email);
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;
        return { message: "Logged in successfully", accessToken, refreshToken };
    }
    logout(req) {
        req.session.destroy((err) => {
            if (err) {
                throw new common_1.UnauthorizedException("Failed to logout");
            }
        });
        return { message: "Logged out successfully" };
    }
    async validateUser(payload) {
        const user = await this.authRepository.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.AuthRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=service.js.map