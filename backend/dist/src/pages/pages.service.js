"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
let PagesService = class PagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
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
                    histories: {
                        create: {
                            content: data.content,
                            editedBy: 'admin',
                        }
                    }
                },
            });
        }
        catch (error) {
            fs.appendFileSync('error.log', `${new Date().toISOString()} ERROR in create: ${error.message}\n${error.stack}\n`);
            throw error;
        }
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
            data: {
                ...data,
                histories: data.content ? {
                    create: {
                        content: data.content,
                        editedBy: 'admin',
                    }
                } : undefined
            },
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
    async getHistory(id) {
        return this.prisma.pageHistory.findMany({
            where: { pageId: id },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PagesService);
//# sourceMappingURL=pages.service.js.map