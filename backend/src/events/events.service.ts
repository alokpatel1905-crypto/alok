import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
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

  async findAll(page = 1, limit = 10, search = '', status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

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

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { 
        institution: true,
        speakers: true,
        registrations: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // Speaker Management
  async addSpeaker(eventId: string, data: any) {
    return this.prisma.speaker.create({
      data: { ...data, eventId },
    });
  }

  async removeSpeaker(speakerId: string) {
    return this.prisma.speaker.delete({ where: { id: speakerId } });
  }

  // Registration Tracking
  async registerForEvent(eventId: string, data: any) {
    return this.prisma.eventRegistration.create({
      data: { ...data, eventId },
    });
  }

  async updateRegistrationStatus(regId: string, status: string) {
    return this.prisma.eventRegistration.update({
      where: { id: regId },
      data: { status },
    });
  }

  async update(id: string, dto: UpdateEventDto) {
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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.event.delete({ where: { id } });
  }

  async getCounts() {
    const total = await this.prisma.event.count();
    const upcoming = await this.prisma.event.count({ where: { status: 'UPCOMING' } });
    const ongoing = await this.prisma.event.count({ where: { status: 'ONGOING' } });

    return { total, upcoming, ongoing };
  }
}
