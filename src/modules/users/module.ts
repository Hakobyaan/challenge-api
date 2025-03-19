import { Module } from "@nestjs/common";
import { UsersService } from "./service";
import { UsersController } from "./controller";
import { UsersRepository } from "./repository"; // Import UsersRepository
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "../auth/module";

@Module({
  imports: [DatabaseModule, AuthModule], // Add DatabaseModule to imports
  providers: [UsersService, UsersRepository], // Make sure UsersRepository is here
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
