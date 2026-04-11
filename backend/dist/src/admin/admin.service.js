"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const programs_service_1 = require("../programs/programs.service");
const fs = __importStar(require("fs"));
let AdminService = class AdminService {
    prisma;
    programsService;
    constructor(prisma, programsService) {
        this.prisma = prisma;
        this.programsService = programsService;
    }
    async getDashboardStats() {
        try {
            const totalUsers = await this.prisma.user.count();
            const activeUsers = await this.prisma.user.count({ where: { isActive: true } });
            const totalInstitutions = await this.prisma.institution.count();
            const recentInstitutions = await this.prisma.institution.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
            const totalAccreditations = await this.prisma.accreditation.count();
            const approvedAccreditations = await this.prisma.accreditation.count({ where: { status: 'APPROVED' } });
            const totalRankings = await this.prisma.ranking.count();
            const recentRankings = await this.prisma.ranking.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { institution: { select: { name: true } } }
            });
            const totalEvents = await this.prisma.event.count();
            const upcomingEvents = await this.prisma.event.count({ where: { status: 'UPCOMING' } });
            const recentEvents = await this.prisma.event.findMany({
                where: { status: 'UPCOMING' },
                take: 5,
                orderBy: { startDate: 'asc' }
            });
            const totalAwards = await this.prisma.award.count();
            const totalDocuments = await this.prisma.document.count();
            const totalPayments = await this.prisma.payment.count();
            const totalRevenue = await this.prisma.payment.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true }
            });
            const unreadNotifications = await this.prisma.notification.count({ where: { isRead: false } });
            const recentAlerts = await this.prisma.notification.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
            const programCounts = await this.programsService.getCounts();
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
        catch (error) {
            fs.appendFileSync('error.log', `${new Date().toISOString()} ERROR: ${error.message}\n${error.stack}\n`);
            throw error;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        programs_service_1.ProgramsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map