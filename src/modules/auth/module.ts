import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./service";
import { AuthController } from "./controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthRepository } from "./repository";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/module";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h" },
    }),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [AuthService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
