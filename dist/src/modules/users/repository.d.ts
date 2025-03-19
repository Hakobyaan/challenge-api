import { Pool } from "pg";
export declare class UsersRepository {
    private readonly pool;
    constructor(pool: Pool);
    checkIfEmailExists(email: string): Promise<boolean>;
    createUser(user: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        age: number;
    }): Promise<any>;
    searchUsers(criteria: {
        first_name?: string;
        last_name?: string;
        age?: number;
    }): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findOne(id: number): Promise<any>;
    create(userData: any): Promise<any>;
}
