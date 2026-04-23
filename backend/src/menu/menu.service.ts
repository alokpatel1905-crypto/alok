import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getActiveMenuItems() {
    return this.prisma.menuItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async getAllMenuItems() {
    return this.prisma.menuItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async createMenuItem(data: any) {
    return this.prisma.menuItem.create({ data });
  }

  async updateMenuItem(id: string, data: any) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  async deleteMenuItem(id: string) {
    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
