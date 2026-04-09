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
exports.RankingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RankingsService = class RankingsService {
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
        return this.prisma.ranking.create({
            data: {
                category: dto.category,
                rank: dto.rank,
                year: dto.year,
                score: dto.score,
                institutionId: dto.institutionId,
            },
        });
    }
    async findAll(page = 1, limit = 10, category, year) {
        const skip = (page - 1) * limit;
        const where = {};
        if (category) {
            where.category = { contains: category, mode: 'insensitive' };
        }
        if (year) {
            where.year = +year;
        }
        const [data, total] = await Promise.all([
            this.prisma.ranking.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ year: 'desc' }, { rank: 'asc' }],
                include: {
                    institution: {
                        select: { id: true, name: true, type: true },
                    },
                },
            }),
            this.prisma.ranking.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const ranking = await this.prisma.ranking.findUnique({
            where: { id },
            include: {
                institution: true,
            },
        });
        if (!ranking) {
            throw new common_1.NotFoundException('Ranking not found');
        }
        return ranking;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.ranking.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.ranking.delete({ where: { id } });
    }
    async getTopRankings(limit = 5) {
        return this.prisma.ranking.findMany({
            take: limit,
            orderBy: [{ rank: 'asc' }],
            include: {
                institution: {
                    select: { name: true },
                },
            },
        });
    }
    async createSubmission(data) {
        return this.prisma.rankingSubmission.create({
            data: {
                ...data,
                status: 'SUBMITTED',
            },
        });
    }
    async findAllSubmissions(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.prisma.rankingSubmission.findMany({
            skip,
            take: limit,
            include: { institution: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async evaluateSubmission(id, reviewerId, reviewerNote) {
        const submission = await this.prisma.rankingSubmission.findUnique({
            where: { id },
        });
        if (!submission)
            throw new Error('Submission not found');
        const data = submission.data || {};
        let calculatedScore = 0;
        if (data.energyEfficiency)
            calculatedScore += (data.energyEfficiency * 0.4);
        if (data.wasteManagement)
            calculatedScore += (data.wasteManagement * 0.3);
        if (data.curriculumIntegration)
            calculatedScore += (data.curriculumIntegration * 0.3);
        return this.prisma.rankingSubmission.update({
            where: { id },
            data: {
                status: 'UNDER_REVIEW',
                score: calculatedScore,
                reviewerId,
                reviewerNote,
            },
        });
    }
    async finalizeResult(id) {
        const sub = await this.prisma.rankingSubmission.findUnique({ where: { id } });
        if (!sub || !sub.score)
            throw new Error('Ready for finalization? No score found.');
        return this.prisma.ranking.create({
            data: {
                category: sub.category,
                year: sub.year,
                score: sub.score,
                rank: 0,
                institutionId: sub.institutionId,
            },
        });
    }
};
exports.RankingsService = RankingsService;
exports.RankingsService = RankingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RankingsService);
//# sourceMappingURL=rankings.service.js.map