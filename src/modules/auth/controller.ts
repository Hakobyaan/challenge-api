import { Controller, Post, Body, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { Request } from "express";
import { AuthService } from "./service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 409, description: "Email already exists" })
  //SignUp users
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return user;
  }
  //SignIn users
  @Post("login")
  @ApiOperation({ summary: "Login a user" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: "User logged in successfully" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req, loginUserDto); // Pass both `req` and `loginUserDto`
  }
}
