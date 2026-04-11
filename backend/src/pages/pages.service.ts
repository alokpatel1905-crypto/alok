import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: {
    title: string;
    slug: string;
    content?: any;
    image?: string;
    status?: 'DRAFT' | 'PUBLISHED';
  }) {
    try {
    const existing = await this.prisma.page.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new BadRequestException('Slug already exists');
    }

    return this.prisma.page.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        image: data.image,
        status: data.status || 'DRAFT',
        histories: {
          create: {
            content: data.content,
            editedBy: 'admin', // Placeholder until auth is wired
          }
        }
      },
    });
    } catch (error: any) {
      fs.appendFileSync('error.log', `${new Date().toISOString()} ERROR in create: ${error.message}\n${error.stack}\n`);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.page.findMany({
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
    });

    if (!page) {
      throw new NotFoundException('Published page not found');
    }

    return page;
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
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
      content?: any;
      image?: string;
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
      data: {
        ...data,
        histories: data.content ? {
          create: {
            content: data.content,
            editedBy: 'admin',
          }
        } : undefined
      },
    });
  }

  async remove(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return this.prisma.page.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async findById(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async getHistory(id: string) {
    return this.prisma.pageHistory.findMany({
      where: { pageId: id },
      orderBy: { createdAt: 'desc' },
    });
  }
}