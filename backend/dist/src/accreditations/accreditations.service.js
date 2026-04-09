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
exports.AccreditationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AccreditationsService = class AccreditationsService {
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
        return this.prisma.accreditation.create({
            data: {
                title: dto.title,
                status: dto.status || 'PENDING',
                expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
                certificateUrl: dto.certificateUrl,
                institutionId: dto.institutionId,
            },
        });
    }
    async findAll(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        const [data, total] = await Promise.all([
            this.prisma.accreditation.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    institution: {
                        select: { id: true, name: true, type: true },
                    },
                },
            }),
            this.prisma.accreditation.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const accreditation = await this.prisma.accreditation.findUnique({
            where: { id },
            include: {
                institution: true,
            },
        });
        if (!accreditation) {
            throw new common_1.NotFoundException('Accreditation not found');
        }
        return accreditation;
    }
    async update(id, dto) {
        const accreditation = await this.findOne(id);
        return this.prisma.accreditation.update({
            where: { id },
            data: {
                ...dto,
                expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : accreditation.expiryDate,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.accreditation.delete({ where: { id } });
    }
    async getCounts() {
        const total = await this.prisma.accreditation.count();
        const approved = await this.prisma.accreditation.count({ where: { status: 'APPROVED' } });
        const pending = await this.prisma.accreditation.count({ where: { status: 'PENDING' } });
        return { total, approved, pending };
    }
};
exports.AccreditationsService = AccreditationsService;
exports.AccreditationsService = AccreditationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccreditationsService);
//# sourceMappingURL=accreditations.service.js.map