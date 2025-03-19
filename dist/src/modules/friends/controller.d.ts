import { FriendsService } from "./service";
import { FriendRequestDto } from "./dto/friends-request.dto";
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    sendFriendRequest(body: {
        userId: number;
        friendId: number;
    }): Promise<FriendRequestDto>;
    getFriendRequests(userId: number): Promise<FriendRequestDto[]>;
    respondToFriendRequest(requestId: number, status: "accepted" | "declined"): Promise<FriendRequestDto>;
}
