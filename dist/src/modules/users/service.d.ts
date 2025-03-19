import { UsersRepository } from "./repository";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    searchUsers(criteria: {
        first_name?: string;
        last_name?: string;
        age?: number;
    }): Promise<any>;
    findByEmail(email: string): Promise<any>;
    create(userData: any): Promise<any>;
    findById(userId: number): Promise<any>;
}
