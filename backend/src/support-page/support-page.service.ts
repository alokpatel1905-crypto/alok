import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportPageService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    try {
      const existing = await this.prisma.supportPage.findFirst();
      if (!existing) return this.getDefaults();
      return existing;
    } catch (error) {
      if (error.code === 'P2021' || error.message?.includes('does not exist')) {
        return this.getDefaults();
      }
      throw error;
    }
  }

  async updatePageConfig(data: any) {
    try {
      const existing = await this.prisma.supportPage.findFirst();
      const cleanedData = { ...data };
      delete cleanedData.id;
      delete cleanedData.created_at;
      delete cleanedData.updated_at;

      if (existing) {
        return this.prisma.supportPage.update({ where: { id: existing.id }, data: cleanedData });
      } else {
        return this.prisma.supportPage.create({ data: cleanedData });
      }
    } catch (error) {
      if (error.code === 'P2021' || error.message?.includes('does not exist')) {
        const cleanedData = { ...data };
        delete cleanedData.id;
        delete cleanedData.created_at;
        delete cleanedData.updated_at;
        return this.prisma.supportPage.create({ data: cleanedData });
      }
      throw error;
    }
  }

  // Delete the existing SupportPage configuration
  async deletePageConfig() {
    const existing = await this.prisma.supportPage.findFirst();
    if (existing) {
      return this.prisma.supportPage.delete({ where: { id: existing.id } });
    }
    return { message: 'No SupportPage record to delete' };
  }

  private getDefaults() {
    return {
      page_title: 'Support Us',
      subtitle: 'Help Shape a Sustainable Future Through Education',
      intro_description: 'Green Mentors works with schools, universities, educators, students, and global partners to embed sustainability into education systems. Support from partners, sponsors, and supporters helps scale this impact worldwide.',

      partnership_title: 'Institutional Partnerships',
      partnership_subtitle: 'Collaborating to Advance Sustainable Education at Scale',
      partnership_description: 'Schools, universities, foundations, networks, and mission-aligned organizations can partner with Green Mentors to expand sustainability-led education systems.\n\nPartnerships may support accreditation, rankings, events, ecosystem growth, and long-term institutional transformation.',
      partnership_button_1_text: 'Become a Partner',
      partnership_button_1_link: '/support/partner',
      partnership_button_2_text: 'Know More',
      partnership_button_2_link: '/support/partnerships',

      sponsorship_title: 'Sponsorship Opportunities',
      sponsorship_subtitle: 'Supporting High-Impact Initiatives and Global Gatherings',
      sponsorship_description: 'Sponsors can support conferences, awards, fellowships, youth engagement initiatives, and other programs that advance sustainability in education.\n\nSponsorship provides meaningful visibility while contributing to responsible, future-ready learning systems.',
      sponsorship_button_1_text: 'Explore Sponsorship',
      sponsorship_button_1_link: '/support/sponsorship',
      sponsorship_button_2_text: 'Know More',
      sponsorship_button_2_link: '/support/sponsorship-details',

      philanthropy_title: 'Philanthropic Support',
      philanthropy_subtitle: 'Investing in Future-Ready, Climate-Conscious Learning',
      philanthropy_description: 'Philanthropic supporters help Green Mentors scale sustainability-led education initiatives to reach more institutions, educators, and students across regions.\n\nSupport contributes to long-term social, educational, and environmental resilience.',
      philanthropy_button_1_text: 'Support the Mission',
      philanthropy_button_1_link: '/support/donate',
      philanthropy_button_2_text: 'Know More',
      philanthropy_button_2_link: '/support/philanthropy',

      advisory_title: 'Volunteer & Advisory Support',
      advisory_subtitle: 'Contribute Expertise, Leadership, and Global Perspective',
      advisory_description: 'Educators, researchers, professionals, and mission-aligned leaders can contribute through mentorship, advisory guidance, speaking engagements, and knowledge sharing.\n\nThis strengthens the Green Mentors ecosystem and supports collaborative growth.',
      advisory_button_1_text: 'Get Involved',
      advisory_button_1_link: '/support/get-involved',
      advisory_button_2_text: 'Know More',
      advisory_button_2_link: '/support/advisory',

      why_title: 'Why Support Green Mentors',
      why_description: 'Supporting Green Mentors helps:\n- expand sustainability frameworks in education\n- strengthen institutional transformation\n- empower educators and students\n- build climate-conscious learning environments\n- create measurable social and environmental impact\n- contribute to global systems change',

      impact_title: 'Your Support Enables Impact',
      impact_description: 'Support from partners and contributors helps Green Mentors:\n- grow accreditation and rankings systems\n- strengthen events and global gatherings\n- expand educator and student engagement\n- deepen sustainability integration in institutions\n- build a stronger global ecosystem for responsible education',

      process_title: 'How We Work with Supporters',
      step1: 'Connect with Green Mentors',
      step2: 'Identify Shared Goals',
      step3: 'Design the Support Pathway',
      step4: 'Create and Scale Impact Together',

      quote_title: 'Shared Responsibility, Shared Impact',
      quote_description: '"Responsible education is a shared mission. Through meaningful partnerships and sustained support, we can help institutions shape a more resilient and sustainable future."',
      quote_author: 'Green Mentors Leadership',

      cta_title: 'Support the Future of Responsible Education',
      cta_description: 'Invite institutions, sponsors, donors, educators, and mission-aligned partners to contribute to a global movement for sustainability-led learning.',
      button_text: 'Become a Partner',
      button_link: '/contact',
      secondary_button_text: 'Contact Green Mentors',
      secondary_button_link: '/contact',

      meta_title: 'Support Green Mentors | Partner for Sustainable Education',
      meta_keywords: 'support green mentors, education partnership, sustainability sponsorship, philanthropic support, responsible education',
      meta_description: 'Support Green Mentors through partnerships, sponsorships, philanthropy, and advisory engagement to advance sustainability in education worldwide.',
      status: 'Active',
    };
  }
}
