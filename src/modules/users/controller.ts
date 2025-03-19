import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UsersService } from "./service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
// import { JwtStrategy } from "../auth/strategies/jwt.strategy";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("search")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Search users by first name, last name, or age" })
  @ApiResponse({
    status: 200,
    description: "List of users matching the criteria",
  })
  //Fiend Users (Friends)
  searchUsers(@Query() criteria: any) {
    return this.usersService.searchUsers(criteria);
  }
}
