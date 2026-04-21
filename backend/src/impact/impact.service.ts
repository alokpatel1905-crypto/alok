import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImpactService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.impactPage.findFirst();
    if (!existing) {
      return {
        title: 'Our Impact',
        subtitle: 'Transforming Education for the Planet',
        description: 'Green Mentors is committed to creating measurable global impact by embedding sustainability into education systems worldwide.',
        stat1_title: 'Schools & Universities',
        stat1_value: '8000+',
        stat2_title: 'Educators Trained',
        stat2_value: '50,000+',
        stat3_title: 'Students Empowered',
        stat3_value: '10 Million',
        stat4_title: 'Countries Active',
        stat4_value: '45',
        status: 'Active',
      };
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.impactPage.findFirst();
    
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;

    if (existing) {
      return this.prisma.impactPage.update({
        where: { id: existing.id },
        data: cleanedData,
      });
    } else {
      return this.prisma.impactPage.create({
        data: cleanedData,
      });
    }
  }
}
