import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/service";

@Injectable()
export class AuthRepository {
  constructor(private usersService: UsersService) {}

  async findByEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  async create(user) {
    return await this.usersService.create(user); // Call user service to handle DB logic
  }
  async findById(userId: number) {
    const user = await this.usersService.findById(userId);
    return user;
  }
}
