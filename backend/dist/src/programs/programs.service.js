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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgramsService = class ProgramsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existingProgram = await this.prisma.program.findUnique({
            where: { slug: dto.slug },
        });
        if (existingProgram) {
            throw new common_1.BadRequestException('Slug already exists');
        }
        return this.prisma.program.create({
            data: {
                title: dto.title,
                slug: dto.slug,
                description: dto.description,
                image: dto.image,
                status: dto.status || 'DRAFT',
            },
        });
    }
    async findAll(page = 1, limit = 10, search = '', status = '', sortBy = 'createdAt', order = 'desc', isActive = '') {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.title = {
                contains: search,
                mode: 'insensitive',
            };
        }
        if (status) {
            where.status = status;
        }
        if (isActive !== '') {
            where.isActive = isActive === 'true';
        }
        const data = await this.prisma.program.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
        });
        const total = await this.prisma.program.count({ where });
        return {
            data,
            total,
            page,
            limit,
            search,
            status,
            sortBy,
            order,
            isActive,
        };
    }
    async findPublished() {
        return this.prisma.program.findMany({
            where: {
                status: 'PUBLISHED',
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findPublishedBySlug(slug) {
        const program = await this.prisma.program.findFirst({
            where: {
                slug,
                status: 'PUBLISHED',
                isActive: true,
            },
        });
        if (!program) {
            throw new common_1.NotFoundException('Published program not found');
        }
        return program;
    }
    async findBySlug(slug) {
        const program = await this.prisma.program.findUnique({
            where: { slug },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        return program;
    }
    async update(id, dto) {
        const program = await this.prisma.program.findUnique({
            where: { id },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        if (dto.slug) {
            const existingProgram = await this.prisma.program.findFirst({
                where: {
                    slug: dto.slug,
                    NOT: { id },
                },
            });
            if (existingProgram) {
                throw new common_1.BadRequestException('Slug already exists');
            }
        }
        return this.prisma.program.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        return this.prisma.program.delete({
            where: { id },
        });
    }
    async toggleActive(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        return this.prisma.program.update({
            where: { id },
            data: {
                isActive: !program.isActive,
            },
        });
    }
    async toggleStatus(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        return this.prisma.program.update({
            where: { id },
            data: {
                status: program.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
            },
        });
    }
    async findById(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
        });
        if (!program) {
            throw new common_1.NotFoundException('Program not found');
        }
        return program;
    }
    async getCounts() {
        const total = await this.prisma.program.count();
        const published = await this.prisma.program.count({
            where: { status: 'PUBLISHED' },
        });
        const draft = await this.prisma.program.count({
            where: { status: 'DRAFT' },
        });
        const active = await this.prisma.program.count({
            where: { isActive: true },
        });
        const inactive = await this.prisma.program.count({
            where: { isActive: false },
        });
        return {
            total,
            published,
            draft,
            active,
            inactive,
        };
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map