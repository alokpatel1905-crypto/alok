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
exports.AwardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AwardsService = class AwardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const institution = await this.prisma.institution.findUnique({
            where: { id: dto.institutionId },
        });
        if (!institution) {
            throw new common_1.NotFoundException('Institution not found');
        }
        return this.prisma.award.create({
            data: dto,
        });
    }
    async findAll(page = 1, limit = 10, search = '', year, status) {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (year) {
            where.year = +year;
        }
        if (status) {
            where.status = status;
        }
        const [data, total] = await Promise.all([
            this.prisma.award.findMany({
                where,
                skip,
                take: limit,
                orderBy: { year: 'desc' },
                include: {
                    institution: { select: { id: true, name: true } },
                },
            }),
            this.prisma.award.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async createNomination(data) {
        return this.prisma.awardNomination.create({ data });
    }
    async findAllNominations(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.awardNomination.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { institution: { select: { name: true } } },
            }),
            this.prisma.awardNomination.count(),
        ]);
        return { data, total };
    }
    async updateNominationStatus(id, status) {
        return this.prisma.awardNomination.update({
            where: { id },
            data: { status },
        });
    }
    async toggleArchive(id) {
        const award = await this.findOne(id);
        const newStatus = award.status === 'ARCHIVED' ? 'WINNER' : 'ARCHIVED';
        return this.prisma.award.update({
            where: { id },
            data: { status: newStatus },
        });
    }
    async findOne(id) {
        const award = await this.prisma.award.findUnique({
            where: { id },
            include: { institution: true },
        });
        if (!award) {
            throw new common_1.NotFoundException('Award not found');
        }
        return award;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.award.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.award.delete({ where: { id } });
    }
    async getCounts() {
        return this.prisma.award.count();
    }
};
exports.AwardsService = AwardsService;
exports.AwardsService = AwardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AwardsService);
//# sourceMappingURL=awards.service.js.map