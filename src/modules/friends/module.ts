import { Module } from "@nestjs/common";
import { FriendsService } from "./service";
import { FriendsController } from "./controller";
import { FriendsRepository } from "./repository";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [FriendsService, FriendsRepository],
  controllers: [FriendsController],
})
export class FriendsModule {}
