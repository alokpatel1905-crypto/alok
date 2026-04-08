import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@Injectable()
export class AwardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAwardDto) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: dto.institutionId },
    });

    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    return this.prisma.award.create({
      data: dto,
    });
  }

  async findAll(page = 1, limit = 10, search = '', year?: number, status?: any) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (year) {
      where.year = +year;
    }

    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.award.findMany({
        where,
        skip,
        take: limit,
        orderBy: { year: 'desc' },
        include: {
          institution: { select: { id: true, name: true } },
        },
      }),
      this.prisma.award.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  // Nomination Management
  async createNomination(data: any) {
    return this.prisma.awardNomination.create({ data });
  }

  async findAllNominations(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.awardNomination.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { institution: { select: { name: true } } },
      }),
      this.prisma.awardNomination.count(),
    ]);
    return { data, total };
  }

  async updateNominationStatus(id: string, status: string) {
    return this.prisma.awardNomination.update({
      where: { id },
      data: { status },
    });
  }

  // Archive Management
  async toggleArchive(id: string) {
    const award = await this.findOne(id);
    const newStatus = award.status === 'ARCHIVED' ? 'WINNER' : 'ARCHIVED';
    return this.prisma.award.update({
      where: { id },
      data: { status: newStatus as any },
    });
  }

  async findOne(id: string) {
    const award = await this.prisma.award.findUnique({
      where: { id },
      include: { institution: true },
    });

    if (!award) {
      throw new NotFoundException('Award not found');
    }

    return award;
  }

  async update(id: string, dto: UpdateAwardDto) {
    await this.findOne(id);
    return this.prisma.award.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.award.delete({ where: { id } });
  }

  async getCounts() {
    return this.prisma.award.count();
  }
}
