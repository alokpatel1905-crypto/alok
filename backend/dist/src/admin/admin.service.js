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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const programs_service_1 = require("../programs/programs.service");
let AdminService = class AdminService {
    prisma;
    programsService;
    constructor(prisma, programsService) {
        this.prisma = prisma;
        this.programsService = programsService;
    }
    async getDashboardStats() {
        const [totalUsers, activeUsers, totalInstitutions, recentInstitutions, totalAccreditations, approvedAccreditations, totalRankings, recentRankings, totalEvents, upcomingEvents, recentEvents, totalAwards, totalDocuments, totalPayments, totalRevenue, unreadNotifications, recentAlerts, programCounts,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.institution.count(),
            this.prisma.institution.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
            this.prisma.accreditation.count(),
            this.prisma.accreditation.count({ where: { status: 'APPROVED' } }),
            this.prisma.ranking.count(),
            this.prisma.ranking.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { institution: { select: { name: true } } } }),
            this.prisma.event.count(),
            this.prisma.event.count({ where: { status: 'UPCOMING' } }),
            this.prisma.event.findMany({ where: { status: 'UPCOMING' }, take: 5, orderBy: { startDate: 'asc' } }),
            this.prisma.award.count(),
            this.prisma.document.count(),
            this.prisma.payment.count(),
            this.prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
            this.prisma.notification.count({ where: { isRead: false } }),
            this.prisma.notification.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
            this.programsService.getCounts(),
        ]);
        return {
            overview: {
                totalUsers,
                activeUsers,
                totalInstitutions,
                recentInstitutions,
            },
            accreditations: {
                total: totalAccreditations,
                approved: approvedAccreditations,
            },
            rankings: {
                total: totalRankings,
                recent: recentRankings,
            },
            events: {
                total: totalEvents,
                upcomingCount: upcomingEvents,
                upcoming: recentEvents,
            },
            awards: { total: totalAwards },
            documents: { total: totalDocuments },
            analytics: {
                totalPayments,
                totalRevenue: totalRevenue._sum.amount || 0,
            },
            alerts: {
                unreadCount: unreadNotifications,
                recent: recentAlerts,
            },
            programs: programCounts,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        programs_service_1.ProgramsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map