import { Request } from "express";
import { AuthService } from "./service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(req: Request, loginUserDto: LoginUserDto): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
}
