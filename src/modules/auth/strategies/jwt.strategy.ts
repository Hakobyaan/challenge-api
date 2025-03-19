import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (req) => {
        console.log("Request Headers:", req.headers); // Log headers for debugging
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        console.log("Extracted Token:", token); // Log the extracted token
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || "secret",
    });
  }

  async validate(payload: any) {
    console.log("JWT Payload:", payload); // Log the payload for debugging
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException("Invalid token or user not found");
    }
    return user;
  }
}
