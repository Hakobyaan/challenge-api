import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class FriendsRepository {
  constructor(@Inject("DATABASE_POOL") private pool: Pool) {}

  async sendFriendRequest(userId: number, friendId: number) {
    // Check if users exist
    const query = `
      SELECT id FROM users WHERE id IN ($1, $2)
    `;
    const result = await this.pool.query(query, [userId, friendId]);

    if (result.rows.length < 2) {
      throw new NotFoundException("One or both users not found");
    }

    // Insert friend request
    const insertQuery = `
      INSERT INTO friends (user_id, friend_id, status)
      VALUES ($1, $2, 'pending')
      RETURNING id, user_id, friend_id, status
    `;
    const insertResult = await this.pool.query(insertQuery, [userId, friendId]);
    return insertResult.rows[0];
  }

  async getFriendRequests(userId: number) {
    const query = `
      SELECT * FROM friends
      WHERE friend_id = $1 AND status = 'pending'
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async respondToFriendRequest(
    requestId: number,
    status: "accepted" | "declined",
  ) {
    const query = `
      UPDATE friends
      SET status = $1
      WHERE id = $2
      RETURNING id, user_id, friend_id, status
    `;
    const result = await this.pool.query(query, [status, requestId]);
    if (result.rows.length === 0) {
      throw new NotFoundException("Friend request not found");
    }
    return result.rows[0];
  }
}
