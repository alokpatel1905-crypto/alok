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
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PublicationsService = class PublicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPublication(data) {
        return this.prisma.publication.create({ data });
    }
    async findAllPublications(page = 1, limit = 10, type) {
        const skip = (page - 1) * limit;
        const where = {};
        if (type)
            where.type = type;
        const [data, total] = await Promise.all([
            this.prisma.publication.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.publication.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async updatePublication(id, data) {
        return this.prisma.publication.update({ where: { id }, data });
    }
    async removePublication(id) {
        return this.prisma.publication.delete({ where: { id } });
    }
    async createPressRelease(data) {
        return this.prisma.pressRelease.create({ data });
    }
    async findAllPressReleases(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.pressRelease.findMany({
                skip,
                take: limit,
                orderBy: { date: 'desc' },
            }),
            this.prisma.pressRelease.count(),
        ]);
        return { data, total, page, limit };
    }
    async updatePressRelease(id, data) {
        return this.prisma.pressRelease.update({ where: { id }, data });
    }
    async removePressRelease(id) {
        return this.prisma.pressRelease.delete({ where: { id } });
    }
};
exports.PublicationsService = PublicationsService;
exports.PublicationsService = PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationsService);
//# sourceMappingURL=publications.service.js.map