import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaPageService {
  constructor(private readonly prisma: PrismaService) {}

  // ---- CONFIG ----
  async getConfig() {
    let config = await this.prisma.mediaPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.mediaPageConfig.create({
        data: {
          page_title: "Media & Publications",
          subtitle: "Stories, Insights, and Global Visibility",
          intro_description: "Explore our latest news, press releases, publications, and gallery highlights.",
          cta_title: "Media Inquiries",
          cta_description: "For press kits, interviews, and media partnerships, please connect with our public relations department.",
          cta_button_text: "Contact Media Team",
          cta_button_link: "/contact"
        }
      });
    }
    return config;
  }

  async updateConfig(data: any) {
    const config = await this.getConfig();
    return this.prisma.mediaPageConfig.update({
      where: { id: config.id },
      data
    });
  }

  // ---- POSTS ----
  async getPosts() {
    return this.prisma.mediaPost.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAllPosts() {
    return this.prisma.mediaPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createPost(data: any) {
    return this.prisma.mediaPost.create({ data });
  }

  async updatePost(id: string, data: any) {
    return this.prisma.mediaPost.update({ where: { id }, data });
  }

  async deletePost(id: string) {
    return this.prisma.mediaPost.delete({ where: { id } });
  }
}
