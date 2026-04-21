import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MilestonesService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.milestonePage.findFirst();
    if (!existing) {
      return {
        page_title: 'Milestones of Impact',
        subtitle: 'Our Journey and Global Recognition',
        intro_description: 'Green Mentors’ journey reflects its commitment to transforming education through sustainability, climate responsibility, and global partnerships.',
        status: 'Active',
      };
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.milestonePage.findFirst();
    
    // Safety clean updates
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.updatedAt;
    delete cleanedData.createdAt;

    if (existing) {
      return this.prisma.milestonePage.update({
        where: { id: existing.id },
        data: cleanedData,
      });
    } else {
      return this.prisma.milestonePage.create({
        data: cleanedData,
      });
    }
  }

  async getAllMilestones() {
    return this.prisma.milestone.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async addMilestone(data: any) {
    return this.prisma.milestone.create({
      data: {
        year: data.year,
        title: data.title || '',
        description: data.description,
        order: Number(data.order) || 0,
        status: data.status || 'Active',
      },
    });
  }

  async updateMilestone(id: string, data: any) {
    return this.prisma.milestone.update({
      where: { id },
      data: {
        year: data.year,
        title: data.title || '',
        description: data.description,
        order: Number(data.order) || 0,
        status: data.status || 'Active',
      },
    });
  }

  async deleteMilestone(id: string) {
    return this.prisma.milestone.delete({
      where: { id },
    });
  }
}
