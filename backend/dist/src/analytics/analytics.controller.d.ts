import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
            name: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
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
    getParticipationReport(): Promise<{
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
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            phone: string | null;
            eventId: string;
        })[];
        popularEvents: ({
            _count: {
                registrations: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            image: string | null;
            status: import("@prisma/client").$Enums.EventStatus;
            views: number;
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
