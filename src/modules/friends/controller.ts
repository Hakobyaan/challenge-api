import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { FriendsService } from "./service";
import { FriendRequestDto } from "./dto/friends-request.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Friends")
@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post("request")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Send a friend request" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        userId: { type: "number", example: 1 },
        friendId: { type: "number", example: 2 },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Friend request sent successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async sendFriendRequest(
    @Body() body: { userId: number; friendId: number },
  ): Promise<FriendRequestDto> {
    return await this.friendsService.sendFriendRequest(
      body.userId,
      body.friendId,
    );
  }

  @Get("requests/:userId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get friend requests for a user" })
  @ApiResponse({ status: 200, description: "List of friend requests" })
  async getFriendRequests(
    @Param("userId") userId: number,
  ): Promise<FriendRequestDto[]> {
    return await this.friendsService.getFriendRequests(userId);
  }

  @Post("respond/:requestId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Respond to a friend request" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "accepted" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Friend request updated successfully",
  })
  async respondToFriendRequest(
    @Param("requestId") requestId: number,
    @Body("status") status: "accepted" | "declined",
  ): Promise<FriendRequestDto> {
    const result = await this.friendsService.respondToFriendRequest(
      requestId,
      status,
    );
    return result;
  }
}
