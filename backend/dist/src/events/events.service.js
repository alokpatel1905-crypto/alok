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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.event.create({
            data: {
                title: dto.title,
                description: dto.description,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                location: dto.location,
                status: dto.status || 'UPCOMING',
                image: dto.image,
                institutionId: dto.institutionId || null,
            },
        });
    }
    async findAll(page = 1, limit = 10, search = '', status) {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const [data, total] = await Promise.all([
            this.prisma.event.findMany({
                where,
                skip,
                take: limit,
                orderBy: { startDate: 'asc' },
                include: {
                    institution: { select: { name: true } },
                },
            }),
            this.prisma.event.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                institution: true,
                speakers: true,
                registrations: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async addSpeaker(eventId, data) {
        return this.prisma.speaker.create({
            data: { ...data, eventId },
        });
    }
    async removeSpeaker(speakerId) {
        return this.prisma.speaker.delete({ where: { id: speakerId } });
    }
    async registerForEvent(eventId, data) {
        return this.prisma.eventRegistration.create({
            data: { ...data, eventId },
        });
    }
    async updateRegistrationStatus(regId, status) {
        return this.prisma.eventRegistration.update({
            where: { id: regId },
            data: { status },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.event.update({
            where: { id },
            data: {
                ...dto,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.event.delete({ where: { id } });
    }
    async getCounts() {
        const total = await this.prisma.event.count();
        const upcoming = await this.prisma.event.count({ where: { status: 'UPCOMING' } });
        const ongoing = await this.prisma.event.count({ where: { status: 'ONGOING' } });
        return { total, upcoming, ongoing };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map