import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthRepository } from "./repository";
import { Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  // Generate Access & Refresh Tokens
  private generateTokens(userId: number, email: string) {
    const payload = { email, sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });

    return { accessToken, refreshToken };
  }

  // Register
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.authRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.authRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.generateTokens(newUser.id, newUser.email);
  }

  // Login - Save Tokens in Session
  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.authRepository.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.email,
    );

    // Store tokens in session
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    return { message: "Logged in successfully", accessToken, refreshToken };
  }

  // Logout - Destroy Session
  logout(req: Request) {
    req.session.destroy((err) => {
      if (err) {
        throw new UnauthorizedException("Failed to logout");
      }
    });
    return { message: "Logged out successfully" };
  }

  // Validate User from JWT Payload
  async validateUser(payload: any) {
    const user = await this.authRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user; // Returning user if valid
  }
}
