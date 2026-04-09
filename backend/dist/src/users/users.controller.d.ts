import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    updateUser(id: string, body: any): Promise<{
        id: string;
        isActive: boolean;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    removeUser(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        passwordHash: string;
        refreshTokenHash: string | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
