import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(body: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
    }[]>;
    updateUser(id: string, body: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    removeUser(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        passwordHash: string;
        refreshTokenHash: string | null;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
}
