import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Research Publications
  async createPublication(data: any) {
    return this.prisma.publication.create({ data });
  }

  async findAllPublications(page = 1, limit = 10, type?: any) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (type) where.type = type;

    const [data, total] = await Promise.all([
      this.prisma.publication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.publication.count({ where }),
    ]);
    return { data, total, page, limit };
  }

  async updatePublication(id: string, data: any) {
    return this.prisma.publication.update({ where: { id }, data });
  }

  async removePublication(id: string) {
    return this.prisma.publication.delete({ where: { id } });
  }

  // Press Releases
  async createPressRelease(data: any) {
    return this.prisma.pressRelease.create({ data });
  }

  async findAllPressReleases(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.pressRelease.findMany({
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      this.prisma.pressRelease.count(),
    ]);
    return { data, total, page, limit };
  }

  async updatePressRelease(id: string, data: any) {
    return this.prisma.pressRelease.update({ where: { id }, data });
  }

  async removePressRelease(id: string) {
    return this.prisma.pressRelease.delete({ where: { id } });
  }
}
