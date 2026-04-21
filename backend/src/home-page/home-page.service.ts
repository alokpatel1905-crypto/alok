import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomePageService {
  constructor(private prisma: PrismaService) {}

  async getHomePage() {
    const page = await this.prisma.homePage.findFirst();
    return page || {};
  }

  async updateHomePage(data: any) {
    const existing = await this.prisma.homePage.findFirst();

    if (existing) {
      return this.prisma.homePage.update({
        where: { id: existing.id },
        data,
      });
    }

    return this.prisma.homePage.create({
      data,
    });
  }
}
