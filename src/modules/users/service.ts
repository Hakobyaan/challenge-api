import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  searchUsers(criteria: {
    first_name?: string;
    last_name?: string;
    age?: number;
  }) {
    return this.usersRepository.searchUsers(criteria);
  }
  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  create(userData: any) {
    return this.usersRepository.create(userData);
  }
  findById(userId: number) {
    return this.usersRepository.findOne(userId);
  }
}
