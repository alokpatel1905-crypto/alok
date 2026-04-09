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
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SecurityService = class SecurityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logActivity(data) {
        return this.prisma.auditLog.create({ data });
    }
    async logLogin(data) {
        return this.prisma.loginHistory.create({ data });
    }
    async getAuditLogs(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, email: true } } },
            }),
            this.prisma.auditLog.count(),
        ]);
        return { data, total, page, limit };
    }
    async getLoginHistory(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.loginHistory.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true } } },
            }),
            this.prisma.loginHistory.count(),
        ]);
        return { data, total, page, limit };
    }
    async getSecurityAlerts() {
        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const failedLogins = await this.prisma.loginHistory.count({
            where: {
                status: 'FAILED',
                createdAt: { gte: last24h },
            },
        });
        return {
            recentFailedLogins: failedLogins,
            isHighRisk: failedLogins > 10,
        };
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SecurityService);
//# sourceMappingURL=security.service.js.map