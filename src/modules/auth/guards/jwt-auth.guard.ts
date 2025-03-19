import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("JwtAuthGuard: Checking authentication...");
    try {
      // Call the parent class's canActivate method
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      console.error("JwtAuthGuard: Error in canActivate:", error);
      throw new UnauthorizedException("Invalid or missing token");
    }
  }

  handleRequest(err, user, info) {
    console.log("JwtAuthGuard: Error:", err);
    console.log("JwtAuthGuard: User:", user);
    console.log("JwtAuthGuard: Info:", info);

    if (err || !user) {
      throw new UnauthorizedException("Invalid or missing token");
    }
    return user;
  }
}
