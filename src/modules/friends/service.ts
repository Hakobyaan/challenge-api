import { Injectable } from "@nestjs/common";
import { FriendsRepository } from "./repository"; // Import repository

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  async sendFriendRequest(userId: number, friendId: number) {
    return this.friendsRepository.sendFriendRequest(userId, friendId);
  }

  async getFriendRequests(userId: number) {
    return this.friendsRepository.getFriendRequests(userId);
  }

  async respondToFriendRequest(
    requestId: number,
    status: "accepted" | "declined",
  ) {
    return this.friendsRepository.respondToFriendRequest(requestId, status);
  }
}
