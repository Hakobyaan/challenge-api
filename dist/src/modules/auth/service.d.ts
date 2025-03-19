import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthRepository } from "./repository";
import { Request } from "express";
export declare class AuthService {
    private authRepository;
    private jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    private generateTokens;
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(req: Request, loginUserDto: LoginUserDto): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request): {
        message: string;
    };
    validateUser(payload: any): Promise<any>;
}
