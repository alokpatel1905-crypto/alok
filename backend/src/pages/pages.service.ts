import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: {
    title: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    status?: 'DRAFT' | 'PUBLISHED';
    sections?: any[];
  }) {
    const { sections, ...pageData } = data;
    try {
      return await this.prisma.page.create({
        data: {
          ...pageData,
          status: data.status || 'DRAFT',
          sections: sections ? {
            create: sections
          } : undefined
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        // Return existing page instead of throwing an error for race conditions
        return this.prisma.page.findUnique({ where: { slug: data.slug } });
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.page.findMany({
      include: { sections: { orderBy: { order: 'asc' } } },
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

  async findPublishedBySlug(slug: string) {
    const page = await this.prisma.page.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        isActive: true,
      },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      throw new NotFoundException('Published page not found');
    }

    return page;
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async update(
    id: string,
    data: {
      title?: string;
      slug?: string;
      metaTitle?: string;
      metaDescription?: string;
      status?: 'DRAFT' | 'PUBLISHED';
      isActive?: boolean;
    },
  ) {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (data.slug) {
      const existing = await this.prisma.page.findFirst({
        where: {
          slug: data.slug,
          NOT: { id },
        },
      });

      if (existing) {
        throw new BadRequestException('Slug already exists');
      }
    }

    return this.prisma.page.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.page.delete({
      where: { id },
    });
  }

  async findById(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: 'asc' } } },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }
}
