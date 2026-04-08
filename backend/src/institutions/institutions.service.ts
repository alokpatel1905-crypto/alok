import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInstitutionDto, userId: string) {
    if (dto.email) {
      const existing = await this.prisma.institution.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Institution with this email already exists');
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
    const where: any = {};

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

  async findOne(id: string) {
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
      throw new NotFoundException('Institution not found');
    }

    return institution;
  }

  async update(id: string, dto: UpdateInstitutionDto) {
    await this.findOne(id);

    if (dto.email) {
      const existing = await this.prisma.institution.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (existing) {
        throw new BadRequestException('Institution with this email already exists');
      }
    }

    return this.prisma.institution.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.institution.delete({ where: { id } });
  }
}
