import { SecurityService } from './security.service';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    getAuditLogs(page?: string, limit?: string): Promise<{
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
    getLoginHistory(page?: string, limit?: string): Promise<{
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
    getAlerts(): Promise<{
        recentFailedLogins: number;
        isHighRisk: boolean;
    }>;
}
