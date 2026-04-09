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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
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
        return this.prisma.payment.create({
            data: dto,
        });
    }
    async findAll(page = 1, limit = 10, status, institutionId) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (institutionId) {
            where.institutionId = institutionId;
        }
        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    institution: { select: { name: true } },
                },
            }),
            this.prisma.payment.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: { institution: true },
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.payment.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.payment.delete({ where: { id } });
    }
    async getRevenueStats() {
        const totalRevenue = await this.prisma.payment.aggregate({
            where: { status: 'COMPLETED' },
            _sum: { amount: true },
        });
        const pendingRevenue = await this.prisma.payment.aggregate({
            where: { status: 'PENDING' },
            _sum: { amount: true },
        });
        return {
            totalRevenue: totalRevenue._sum.amount || 0,
            pendingRevenue: pendingRevenue._sum.amount || 0,
        };
    }
    async generateInvoice(id) {
        const payment = await this.findOne(id);
        return {
            invoiceNumber: `INV-${payment.id.slice(-6).toUpperCase()}`,
            date: payment.createdAt,
            institution: payment.institution,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            description: payment.description || 'Service Fee',
            company: {
                name: 'Green Mentors',
                address: '123 Sustainability Way, Eco City',
                email: 'billing@greenmentors.in',
            }
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map