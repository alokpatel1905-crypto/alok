import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    sectionKey: string;
    content: any;
    order?: number;
    pageId: string;
  }) {
    return this.prisma.section.create({
      data,
    });
  }

  async findAllByPageId(pageId: string) {
    return this.prisma.section.findMany({
      where: { pageId },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const section = await this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) throw new NotFoundException('Section not found');
    return section;
  }

  async update(id: string, data: {
    sectionKey?: string;
    content?: any;
    order?: number;
  }) {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.section.delete({
      where: { id },
    });
  }

  async updateOrder(ids: string[]) {
    const updates = ids.map((id, index) =>
      this.prisma.section.update({
        where: { id },
        data: { order: index },
      }),
    );
    return Promise.all(updates);
  }
}
