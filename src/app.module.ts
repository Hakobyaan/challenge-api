import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/module";
import { FriendsModule } from "./modules/friends/module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/module"; // Correct import of AuthModule

@Module({
  imports: [DatabaseModule, UsersModule, FriendsModule, AuthModule], // Ensure AuthModule is imported
})
export class AppModule {}
