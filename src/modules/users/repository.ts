import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class UsersRepository {
  constructor(@Inject("DATABASE_POOL") private readonly pool: Pool) {}

  async checkIfEmailExists(email: string): Promise<boolean> {
    const result = await this.pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    return result.rows.length > 0;
  }

  async createUser(user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
  }) {
    const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, age;
    `;
    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.age,
    ];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async searchUsers(criteria: {
    first_name?: string;
    last_name?: string;
    age?: number;
  }) {
    let query =
      "SELECT id, first_name, last_name, email, age FROM users WHERE 1=1";
    const values: string[] = [];

    if (criteria.first_name) {
      query += ` AND first_name ILIKE $${values.length + 1}`;
      values.push(`%${criteria.first_name}%`);
    }
    if (criteria.last_name) {
      query += ` AND last_name ILIKE $${values.length + 1}`;
      values.push(`%${criteria.last_name}%`);
    }
    if (criteria.age) {
      query += ` AND age = $${values.length + 1}`;
      values.push(criteria.age.toString());
    }

    const result = await this.pool.query(query, values);
    return result.rows;
  }
  async findByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await this.pool.query(query, [email]);
    return result.rows[0]; // Return the first matching user or null
  }
  async findOne(id: number) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rows[0]; // Return the first matching user or null
  }

  async create(userData: any) {
    console.log("Creating user:", userData);
    const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    console.log(query, Object.values(userData));
    const result = await this.pool.query(query, Object.values(userData));
    return result.rows[0]; // Return the created user
  }
}
