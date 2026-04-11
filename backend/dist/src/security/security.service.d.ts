import { PrismaService } from '../prisma/prisma.service';
export declare class SecurityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logActivity(data: {
        userId: string;
        action: string;
        module: string;
        details?: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        module: string;
        details: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    logLogin(data: {
        email: string;
        userId?: string;
        status: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        status: string;
        userId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
    }>;
    getAuditLogs(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                name: string;
                email: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            userId: string | null;
            action: string;
            module: string;
            details: string | null;
            ipAddress: string | null;
            userAgent: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getLoginHistory(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                name: string;
            } | null;
        } & {
            id: string;
            email: string;
            createdAt: Date;
            status: string;
            userId: string | null;
            ipAddress: string | null;
            userAgent: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSecurityAlerts(): Promise<{
        recentFailedLogins: number;
        isHighRisk: boolean;
    }>;
}
