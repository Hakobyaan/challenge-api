import { UsersService } from "./service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    searchUsers(criteria: any): Promise<any>;
}
