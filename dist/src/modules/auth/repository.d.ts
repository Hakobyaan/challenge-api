import { UsersService } from "../users/service";
export declare class AuthRepository {
    private usersService;
    constructor(usersService: UsersService);
    findByEmail(email: string): Promise<any>;
    create(user: any): Promise<any>;
    findById(userId: number): Promise<any>;
}
