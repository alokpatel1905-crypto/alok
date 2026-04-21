import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            isActive: boolean;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            isActive: boolean;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
    } | null>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
