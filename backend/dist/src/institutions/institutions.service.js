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
exports.InstitutionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InstitutionsService = class InstitutionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        if (dto.email) {
            const existing = await this.prisma.institution.findUnique({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.BadRequestException('Institution with this email already exists');
            }
        }
        return this.prisma.institution.create({
            data: {
                ...dto,
                managedById: userId,
            },
        });
    }
    async findAll(page = 1, limit = 10, search = '') {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.institution.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { managedBy: { select: { id: true, name: true, email: true } } },
            }),
            this.prisma.institution.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const institution = await this.prisma.institution.findUnique({
            where: { id },
            include: {
                managedBy: { select: { id: true, name: true, email: true } },
                accreditations: { orderBy: { createdAt: 'desc' } },
                rankings: { orderBy: { year: 'desc' } },
                events: { orderBy: { startDate: 'desc' } },
                documents: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!institution) {
            throw new common_1.NotFoundException('Institution not found');
        }
        return institution;
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.email) {
            const existing = await this.prisma.institution.findFirst({
                where: { email: dto.email, NOT: { id } },
            });
            if (existing) {
                throw new common_1.BadRequestException('Institution with this email already exists');
            }
        }
        return this.prisma.institution.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.institution.delete({ where: { id } });
    }
};
exports.InstitutionsService = InstitutionsService;
exports.InstitutionsService = InstitutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstitutionsService);
//# sourceMappingURL=institutions.service.js.map