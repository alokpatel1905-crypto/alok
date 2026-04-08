import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { UpdateAccreditationDto } from './dto/update-accreditation.dto';

@Injectable()
export class AccreditationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccreditationDto) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: dto.institutionId },
    });

    if (!institution) {
      throw new NotFoundException('Institution not found');
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

  async findAll(page = 1, limit = 10, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

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

  async findOne(id: string) {
    const accreditation = await this.prisma.accreditation.findUnique({
      where: { id },
      include: {
        institution: true,
      },
    });

    if (!accreditation) {
      throw new NotFoundException('Accreditation not found');
    }

    return accreditation;
  }

  async update(id: string, dto: UpdateAccreditationDto) {
    const accreditation = await this.findOne(id);

    return this.prisma.accreditation.update({
      where: { id },
      data: {
        ...dto,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : accreditation.expiryDate,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.accreditation.delete({ where: { id } });
  }

  async getCounts() {
    const total = await this.prisma.accreditation.count();
    const approved = await this.prisma.accreditation.count({ where: { status: 'APPROVED' } });
    const pending = await this.prisma.accreditation.count({ where: { status: 'PENDING' } });

    return { total, approved, pending };
  }
}
