import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWebsiteAnalytics(): Promise<{
        totalViews: number;
        breakdown: {
            pages: number;
            programs: number;
            events: number;
        };
        topPages: {
            title: string;
            slug: string;
            views: number;
        }[];
        dailyViews: {
            url: string;
            id: string;
            date: Date;
            hits: number;
        }[];
    }>;
    getRankingAnalytics(): Promise<{
        totalRankings: number;
        averageScore: number;
        categoryStats: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.RankingGroupByOutputType, "category"[]> & {
            _count: {
                _all: number;
            };
            _avg: {
                score: number | null;
            };
        })[];
        topPerformingInstitutions: ({
            _count: {
                rankings: number;
            };
            rankings: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                year: number;
                category: string;
                rank: number;
                score: number | null;
                institutionId: string;
            }[];
        } & {
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
        })[];
    }>;
    getProgramParticipationReport(): Promise<{
        totalRegistrations: number;
        statusStats: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.EventRegistrationGroupByOutputType, "status"[]> & {
            _count: {
                _all: number;
            };
        })[];
        recentRegistrations: ({
            event: {
                title: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            phone: string | null;
            eventId: string;
        })[];
        popularEvents: ({
            _count: {
                registrations: number;
            };
        } & {
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
        })[];
    }>;
    trackView(url: string): Promise<{
        url: string;
        id: string;
        date: Date;
        hits: number;
    }>;
}
