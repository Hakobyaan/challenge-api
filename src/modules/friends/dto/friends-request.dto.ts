export class FriendRequestDto {
  userId: number;
  friendId: number;
  status?: "pending" | "accepted" | "declined";
}
