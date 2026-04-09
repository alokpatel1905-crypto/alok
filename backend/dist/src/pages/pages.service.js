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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PagesService = class PagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existing = await this.prisma.page.findUnique({
            where: { slug: data.slug },
        });
        if (existing) {
            throw new common_1.BadRequestException('Slug already exists');
        }
        return this.prisma.page.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                image: data.image,
                status: data.status || 'DRAFT',
            },
        });
    }
    async findAll() {
        return this.prisma.page.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findPublished() {
        return this.prisma.page.findMany({
            where: {
                status: 'PUBLISHED',
                isActive: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findPublishedBySlug(slug) {
        const page = await this.prisma.page.findFirst({
            where: {
                slug,
                status: 'PUBLISHED',
                isActive: true,
            },
        });
        if (!page) {
            throw new common_1.NotFoundException('Published page not found');
        }
        return page;
    }
    async findBySlug(slug) {
        const page = await this.prisma.page.findUnique({
            where: { slug },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return page;
    }
    async update(id, data) {
        const page = await this.prisma.page.findUnique({
            where: { id },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        if (data.slug) {
            const existing = await this.prisma.page.findFirst({
                where: {
                    slug: data.slug,
                    NOT: { id },
                },
            });
            if (existing) {
                throw new common_1.BadRequestException('Slug already exists');
            }
        }
        return this.prisma.page.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        const page = await this.prisma.page.findUnique({
            where: { id },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return this.prisma.page.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }
    async findById(id) {
        const page = await this.prisma.page.findUnique({
            where: { id },
        });
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return page;
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PagesService);
//# sourceMappingURL=pages.service.js.map