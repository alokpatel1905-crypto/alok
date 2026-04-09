"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWebsiteAnalytics() {
        const [pageViews, programViews, eventViews, dailyViews] = await Promise.all([
            this.prisma.page.aggregate({ _sum: { views: true } }),
            this.prisma.program.aggregate({ _sum: { views: true } }),
            this.prisma.event.aggregate({ _sum: { views: true } }),
            this.prisma.pageView.findMany({
                take: 30,
                orderBy: { date: 'desc' },
            }),
        ]);
        const topPages = await this.prisma.page.findMany({
            take: 5,
            orderBy: { views: 'desc' },
            select: { title: true, views: true, slug: true },
        });
        return {
            totalViews: (pageViews._sum.views || 0) + (programViews._sum.views || 0) + (eventViews._sum.views || 0),
            breakdown: {
                pages: pageViews._sum.views || 0,
                programs: programViews._sum.views || 0,
                events: eventViews._sum.views || 0,
            },
            topPages,
            dailyViews,
        };
    }
    async getRankingAnalytics() {
        const [totalRankings, avgScore, categoryStats] = await Promise.all([
            this.prisma.ranking.count(),
            this.prisma.ranking.aggregate({ _avg: { score: true } }),
            this.prisma.ranking.groupBy({
                by: ['category'],
                _count: { _all: true },
                _avg: { score: true },
            }),
        ]);
        const topPerformingInstitutions = await this.prisma.institution.findMany({
            take: 5,
            include: {
                _count: {
                    select: { rankings: true },
                },
                rankings: {
                    orderBy: { rank: 'asc' },
                    take: 1,
                },
            },
            orderBy: {
                rankings: {
                    _count: 'desc',
                },
            },
        });
        return {
            totalRankings,
            averageScore: avgScore._avg.score || 0,
            categoryStats,
            topPerformingInstitutions,
        };
    }
    async getProgramParticipationReport() {
        const [totalRegistrations, statusStats, recentRegistrations] = await Promise.all([
            this.prisma.eventRegistration.count(),
            this.prisma.eventRegistration.groupBy({
                by: ['status'],
                _count: { _all: true },
            }),
            this.prisma.eventRegistration.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: { event: { select: { title: true } } },
            }),
        ]);
        const popularEvents = await this.prisma.event.findMany({
            take: 5,
            include: {
                _count: {
                    select: { registrations: true },
                },
            },
            orderBy: {
                registrations: {
                    _count: 'desc',
                },
            },
        });
        return {
            totalRegistrations,
            statusStats,
            recentRegistrations,
            popularEvents,
        };
    }
    async trackView(url) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.prisma.pageView.upsert({
            where: {
                url_date: {
                    url,
                    date: today,
                },
            },
            update: {
                hits: { increment: 1 },
            },
            create: {
                url,
                date: today,
                hits: 1,
            },
        });
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map