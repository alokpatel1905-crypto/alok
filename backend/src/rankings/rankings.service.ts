import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RankingsService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.rankingsPage.findFirst();
    if (!existing) {
      return {
        page_title: 'Rankings',
        subtitle: 'Recognizing Leadership in Sustainable Education',
        intro_description: 'Green Mentors rankings highlight institutions that demonstrate excellence in sustainability, environmental responsibility, and climate-conscious education systems.',
        
        school_title: 'Global Green School Ranking',
        school_subtitle: 'Benchmarking Sustainability Leadership in Schools',
        school_description: 'The Global Green School Ranking recognizes schools that successfully integrate sustainability into their curriculum, campus practices, and student engagement.\n\nThis ranking evaluates schools based on environmental responsibility, climate education, and institutional transformation, providing global recognition for sustainability leadership.',
        school_button_1_text: 'Apply for Ranking',
        school_button_1_link: '/apply/school-ranking',
        school_button_2_text: 'Know More',
        school_button_2_link: '/green-school-ranking',

        university_title: 'Global Green University Ranking',
        university_subtitle: 'Recognizing Universities Leading Sustainable Innovation',
        university_description: 'The Global Green University Ranking evaluates universities on sustainability integration across academics, research, campus operations, and community impact.\n\nUniversities are assessed on their commitment to environmental responsibility and their role in shaping future-ready graduates for the green economy.',
        university_button_1_text: 'Apply for Ranking',
        university_button_1_link: '/apply/university-ranking',
        university_button_2_text: 'Know More',
        university_button_2_link: '/green-university-ranking',

        regional_title: 'National & Regional Green Rankings',
        regional_subtitle: 'Strengthening Sustainability at Local Levels',
        regional_description: 'Regional and national rankings allow institutions to benchmark their sustainability performance within their local ecosystem while contributing to global sustainability goals.',
        regional_button_1_text: 'Explore Framework',
        regional_button_1_link: '/regional-ranking',
        regional_button_2_text: 'Contact Us',
        regional_button_2_link: '/contact',

        why_title: 'Why Participate in Rankings',
        why_description: 'Participating in Green Mentors rankings provides institutions with global visibility, credibility, and benchmarking opportunities.\n\nIt helps institutions:\n- showcase sustainability achievements\n- improve institutional strategy\n- gain international recognition\n- align with global sustainability goals',

        methodology_title: 'How Rankings Work',
        methodology_description: 'Green Mentors rankings are based on a structured framework that evaluates institutions across multiple dimensions:\n\n- Curriculum & Learning\n- Campus Operations\n- Environmental Practices\n- Innovation & Research\n- Student Participation\n- Community Engagement\n- Governance & Leadership',

        process_title: 'Ranking Process',
        step1: 'Submit Application',
        step2: 'Institutional Review',
        step3: 'Assessment Against Framework',
        step4: 'Recognition & Ranking Publication',

        cta_title: 'Showcase Your Sustainability Leadership',
        cta_description: 'Join the Green Mentors ranking ecosystem and gain recognition for your institution’s sustainability achievements.',
        button_text: 'Apply Now',
        button_link: '/contact',

        meta_title: 'Green Mentors Rankings | Sustainable Education Recognition',
        meta_keywords: 'green school ranking, green university ranking, sustainability rankings, education rankings',
        meta_description: 'Explore Green Mentors rankings for schools and universities leading sustainability in education.',
        status: 'Active',
      };
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.rankingsPage.findFirst();
    
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;

    if (existing) {
      return this.prisma.rankingsPage.update({
        where: { id: existing.id },
        data: cleanedData,
      });
    } else {
      return this.prisma.rankingsPage.create({
        data: cleanedData,
      });
    }
  }

  // --- Rankings Data CRUD ---

  async findAll(page = 1, limit = 10, category?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      this.prisma.ranking.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ year: 'desc' }, { rank: 'asc' }],
        include: { institution: { select: { name: true, type: true } } },
      }),
      this.prisma.ranking.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const ranking = await this.prisma.ranking.findUnique({
      where: { id },
      include: { institution: { select: { name: true, type: true } } },
    });
    if (!ranking) throw new NotFoundException('Ranking record not found');
    return ranking;
  }

  async create(data: any) {
    return this.prisma.ranking.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.ranking.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.ranking.delete({
      where: { id },
    });
  }
}
