import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeoService {
  constructor(private readonly prisma: PrismaService) {}

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

  async updatePageSeo(id: string, data: { metaTitle?: string; metaDescription?: string; schemaMarkup?: string }) {
    return this.prisma.page.update({
      where: { id },
      data,
    });
  }

  async updateProgramSeo(id: string, data: { metaTitle?: string; metaDescription?: string; schemaMarkup?: string }) {
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
}
