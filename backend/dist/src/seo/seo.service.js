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
exports.SeoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SeoService = class SeoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSitemap() {
        const [pages, programs, events] = await Promise.all([
            this.prisma.page.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
            this.prisma.program.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
            this.prisma.event.findMany({ where: { status: 'UPCOMING' }, select: { id: true, updatedAt: true } }),
        ]);
        return {
            pages: pages.map(p => ({ url: `/${p.slug}`, lastMod: p.updatedAt })),
            programs: programs.map(p => ({ url: `/programs/${p.slug}`, lastMod: p.updatedAt })),
            events: events.map(e => ({ url: `/events/${e.id}`, lastMod: e.updatedAt })),
        };
    }
    async updatePageSeo(id, data) {
        return this.prisma.page.update({
            where: { id },
            data,
        });
    }
    async updateProgramSeo(id, data) {
        return this.prisma.program.update({
            where: { id },
            data,
        });
    }
    async getSeoStats() {
        const [pagesWithSeo, totalPages, programsWithSeo, totalPrograms] = await Promise.all([
            this.prisma.page.count({ where: { metaTitle: { not: null } } }),
            this.prisma.page.count(),
            this.prisma.program.count({ where: { metaTitle: { not: null } } }),
            this.prisma.program.count(),
        ]);
        return {
            pages: { optimized: pagesWithSeo, total: totalPages },
            programs: { optimized: programsWithSeo, total: totalPrograms },
        };
    }
};
exports.SeoService = SeoService;
exports.SeoService = SeoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeoService);
//# sourceMappingURL=seo.service.js.map