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
exports.CommunicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommunicationsService = class CommunicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAnnouncement(data) {
        return this.prisma.announcement.create({ data });
    }
    async findAllAnnouncements(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.announcement.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.announcement.count(),
        ]);
        return { data, total, page, limit };
    }
    async removeAnnouncement(id) {
        return this.prisma.announcement.delete({ where: { id } });
    }
    async subscribe(email, name) {
        const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
        if (existing) {
            if (existing.isActive)
                return existing;
            return this.prisma.newsletterSubscriber.update({
                where: { email },
                data: { isActive: true },
            });
        }
        return this.prisma.newsletterSubscriber.create({ data: { email, name } });
    }
    async unsubscribe(email) {
        return this.prisma.newsletterSubscriber.update({
            where: { email },
            data: { isActive: false },
        });
    }
    async findAllSubscribers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.newsletterSubscriber.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.newsletterSubscriber.count(),
        ]);
        return { data, total, page, limit };
    }
    async broadcastNewsletter(data) {
        const activeSubscribers = await this.prisma.newsletterSubscriber.findMany({
            where: { isActive: true },
            select: { email: true },
        });
        console.log(`Broadcasting newsletter "${data.subject}" to ${activeSubscribers.length} subscribers.`);
        return {
            message: 'Newsletter broadcast started',
            subscriberCount: activeSubscribers.length,
        };
    }
};
exports.CommunicationsService = CommunicationsService;
exports.CommunicationsService = CommunicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunicationsService);
//# sourceMappingURL=communications.service.js.map