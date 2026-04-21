import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NetworksPageService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.networksPage.findFirst();
    if (!existing) return this.getDefaults();
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.networksPage.findFirst();
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;

    if (existing) {
      return this.prisma.networksPage.update({ where: { id: existing.id }, data: cleanedData });
    } else {
      return this.prisma.networksPage.create({ data: cleanedData });
    }
  }

  private getDefaults() {
    return {
      page_title: 'Networks',
      subtitle: 'Building a Global Community for Sustainable Education',
      intro_description: 'Green Mentors networks connect schools, universities, teachers, graduates, innovators, and partners to collaborate, share knowledge, and drive sustainability in education worldwide.',

      school_title: 'Global Green Schools Network',
      school_subtitle: 'Connecting Schools Advancing Sustainability',
      school_description: 'This network brings together schools committed to environmental responsibility, sustainability education, and green campus practices.\n\nIt enables institutions to share best practices, collaborate, and inspire one another toward meaningful transformation.',
      school_button_1_text: 'Join the Network',
      school_button_1_link: '/networks/schools',
      school_button_2_text: 'Know More',
      school_button_2_link: '/networks/schools-details',

      university_title: 'Global Green University Network',
      university_subtitle: 'Advancing Sustainable Higher Education',
      university_description: 'This network connects universities integrating sustainability into academics, research, governance, and campus operations.\n\nIt supports collaboration, innovation, and leadership in sustainable higher education globally.',
      university_button_1_text: 'Join the Network',
      university_button_1_link: '/networks/university',
      university_button_2_text: 'Know More',
      university_button_2_link: '/networks/university-details',

      teacher_title: 'Global Green Teacher Network',
      teacher_subtitle: 'Empowering Educators Through Collaboration',
      teacher_description: 'This network connects educators committed to sustainability-led teaching and environmental responsibility.\n\nIt enables sharing of knowledge, pedagogy, and innovation to strengthen classroom impact.',
      teacher_button_1_text: 'Join the Network',
      teacher_button_1_link: '/networks/teacher',
      teacher_button_2_text: 'Know More',
      teacher_button_2_link: '/networks/teacher-details',

      graduates_title: 'Global Green Graduates Network',
      graduates_subtitle: 'A Community of Future-Ready Leaders',
      graduates_description: 'This network brings together graduates who are prepared to lead sustainability initiatives, innovation, and responsible development in their careers and communities.',
      graduates_button_1_text: 'Join the Network',
      graduates_button_1_link: '/networks/graduates',
      graduates_button_2_text: 'Know More',
      graduates_button_2_link: '/networks/graduates-details',

      innovator_title: 'Global Green Innovator Network',
      innovator_subtitle: 'Connecting Innovation with Sustainability',
      innovator_description: 'This network connects innovators working on sustainable solutions, education systems, and environmental impact initiatives.\n\nIt fosters collaboration, creativity, and global problem-solving.',
      innovator_button_1_text: 'Join the Network',
      innovator_button_1_link: '/networks/innovator',
      innovator_button_2_text: 'Know More',
      innovator_button_2_link: '/networks/innovator-details',

      why_title: 'Why Join Green Mentors Networks',
      why_description: 'Joining Green Mentors networks provides:\n- global collaboration opportunities\n- shared learning and best practices\n- institutional visibility\n- peer inspiration\n- sustainability leadership growth',

      impact_title: 'From Connection to Collective Impact',
      impact_description: 'Green Mentors networks transform connections into measurable impact by enabling institutions, educators, and innovators to collaborate across borders, share solutions, and drive sustainability-led transformation in education systems worldwide.',

      process_title: 'How to Join',
      step1: 'Choose Your Network',
      step2: 'Submit Registration',
      step3: 'Connect and Collaborate',
      step4: 'Grow with the Global Community',

      cta_title: 'Join the Global Green Mentors Community',
      cta_description: 'Be part of a global movement shaping sustainability-led education and collaborative impact.',
      button_text: 'Join Now',
      button_link: '/contact',

      meta_title: 'Green Mentors Networks | Global Sustainability Community',
      meta_keywords: 'green mentors networks, sustainability network, education collaboration, global education community',
      meta_description: 'Explore Green Mentors networks connecting schools, universities, educators, graduates, and innovators worldwide.',
      status: 'Active',
    };
  }
}
