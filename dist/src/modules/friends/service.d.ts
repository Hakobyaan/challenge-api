import { FriendsRepository } from "./repository";
export declare class FriendsService {
    private readonly friendsRepository;
    constructor(friendsRepository: FriendsRepository);
    sendFriendRequest(userId: number, friendId: number): Promise<any>;
    getFriendRequests(userId: number): Promise<any>;
    respondToFriendRequest(requestId: number, status: "accepted" | "declined"): Promise<any>;
}
