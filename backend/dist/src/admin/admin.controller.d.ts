import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<{
        message: string;
        stats: {
            overview: {
                totalUsers: number;
                activeUsers: number;
                totalInstitutions: number;
                recentInstitutions: {
                    id: string;
                    description: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    email: string | null;
                    type: import("@prisma/client").$Enums.InstitutionType;
                    phone: string | null;
                    address: string | null;
                    city: string | null;
                    state: string | null;
                    country: string | null;
                    website: string | null;
                    logo: string | null;
                    managedById: string;
                }[];
            };
            accreditations: {
                total: number;
                approved: number;
            };
            rankings: {
                total: number;
                recent: ({
                    institution: {
                        name: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    year: number;
                    category: string;
                    rank: number;
                    score: number | null;
                    institutionId: string;
                })[];
            };
            events: {
                total: number;
                upcomingCount: number;
                upcoming: {
                    id: string;
                    title: string;
                    description: string | null;
                    image: string | null;
                    status: import("@prisma/client").$Enums.EventStatus;
                    views: number;
                    createdAt: Date;
                    updatedAt: Date;
                    institutionId: string | null;
                    startDate: Date;
                    endDate: Date | null;
                    location: string | null;
                    agenda: string | null;
                }[];
            };
            awards: {
                total: number;
            };
            documents: {
                total: number;
            };
            analytics: {
                totalPayments: number;
                totalRevenue: number;
            };
            alerts: {
                unreadCount: number;
                recent: {
                    id: string;
                    title: string;
                    createdAt: Date;
                    updatedAt: Date;
                    type: import("@prisma/client").$Enums.NotificationType;
                    isRead: boolean;
                    message: string;
                    userId: string;
                }[];
            };
            programs: {
                total: number;
                published: number;
                draft: number;
                active: number;
                inactive: number;
            };
        };
    }>;
}
