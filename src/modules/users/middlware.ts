// src/users/middleware/user.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // For example, logging the request
    console.log("Request received:", req.method, req.url);
    next();
  }
}
