import { Pool } from "pg";
export declare class FriendsRepository {
    private pool;
    constructor(pool: Pool);
    sendFriendRequest(userId: number, friendId: number): Promise<any>;
    getFriendRequests(userId: number): Promise<any>;
    respondToFriendRequest(requestId: number, status: "accepted" | "declined"): Promise<any>;
}
