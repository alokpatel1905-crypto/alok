import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutPageService {
  constructor(private prisma: PrismaService) {}

  async getAboutPage() {
    const existing = await this.prisma.aboutPage.findFirst();
    if (!existing) {
      // Return a blank or default object if none exists
      return {
        section_name: 'About Us',
        page_title: 'About Green Mentors',
        main_description: 'At Green Mentors, we envision a future...',
      };
    }
    return existing;
  }

  async updateAboutPage(data: any) {
    const existing = await this.prisma.aboutPage.findFirst();
    // remove id if present
    delete data.id;
    delete data.updated_at;

    if (existing) {
      return this.prisma.aboutPage.update({
        where: { id: existing.id },
        data,
      });
    } else {
      return this.prisma.aboutPage.create({
        data,
      });
    }
  }
}
