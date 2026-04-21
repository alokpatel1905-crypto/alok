import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AwardsPageService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.awardsPage.findFirst();
    if (!existing) {
      return this.getDefaults();
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.awardsPage.findFirst();

    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;

    if (existing) {
      return this.prisma.awardsPage.update({
        where: { id: existing.id },
        data: cleanedData,
      });
    } else {
      return this.prisma.awardsPage.create({
        data: cleanedData,
      });
    }
  }

  private getDefaults() {
    return {
      page_title: 'Awards',
      subtitle: 'Honoring Leadership in Sustainable Education',
      intro_description: 'Green Mentors Awards celebrate institutions, educators, graduates, innovators, and changemakers who are advancing sustainability through education and responsible leadership.',

      school_title: 'Green School Award',
      school_subtitle: 'Recognizing Schools Leading Environmental Transformation',
      school_description: 'The Green School Award celebrates schools that integrate sustainability into learning, campus culture, environmental stewardship, and student engagement.\n\nIt recognizes schools that create climate-conscious and responsible learning environments and demonstrate measurable transformation in practice.',
      school_button_1_text: 'Nominate Now',
      school_button_1_link: '/awards/green-school/apply',
      school_button_2_text: 'Know More',
      school_button_2_link: '/awards/green-school',

      university_title: 'Green University Award',
      university_subtitle: 'Celebrating Higher Education Institutions Driving Sustainable Change',
      university_description: 'The Green University Award recognizes universities advancing sustainability through academics, research, campus operations, innovation, and community engagement.\n\nIt honors institutions shaping the future of responsible higher education and environmental leadership.',
      university_button_1_text: 'Nominate Now',
      university_button_1_link: '/awards/green-university/apply',
      university_button_2_text: 'Know More',
      university_button_2_link: '/awards/green-university',

      teacher_title: 'Green Teacher Award',
      teacher_subtitle: 'Honoring Educators Inspiring Climate-Conscious Learning',
      teacher_description: 'The Green Teacher Award celebrates educators who integrate sustainability, critical thinking, and environmental responsibility into teaching.\n\nIt recognizes teachers who inspire students to think and act for a better and more sustainable future.',
      teacher_button_1_text: 'Nominate Now',
      teacher_button_1_link: '/awards/green-teacher/apply',
      teacher_button_2_text: 'Know More',
      teacher_button_2_link: '/awards/green-teacher',

      graduate_title: 'Green Graduate Award',
      graduate_subtitle: 'Recognizing Emerging Leaders for a Sustainable Future',
      graduate_description: 'The Green Graduate Award honors graduates who demonstrate commitment to sustainability, innovation, and responsible leadership.\n\nIt celebrates young changemakers contributing to environmental and social progress through education and action.',
      graduate_button_1_text: 'Nominate Now',
      graduate_button_1_link: '/awards/green-graduate/apply',
      graduate_button_2_text: 'Know More',
      graduate_button_2_link: '/awards/green-graduate',

      innovator_title: 'Green Innovator Award',
      innovator_subtitle: 'Celebrating Creative Solutions for Sustainable Education and Society',
      innovator_description: 'The Green Innovator Award recognizes innovators developing ideas, tools, systems, or practices that advance sustainability and education.\n\nIt highlights creative leadership and practical innovation with social and environmental value.',
      innovator_button_1_text: 'Nominate Now',
      innovator_button_1_link: '/awards/green-innovator/apply',
      innovator_button_2_text: 'Know More',
      innovator_button_2_link: '/awards/green-innovator',

      curriculum_title: 'Curriculum Award',
      curriculum_subtitle: 'Recognizing Excellence in Sustainability-Integrated Learning Design',
      curriculum_description: 'The Curriculum Award honors academic frameworks, programs, and learning designs that successfully embed sustainability and environmental responsibility into education.\n\nIt recognizes long-term impact through thoughtful curriculum transformation.',
      curriculum_button_1_text: 'Nominate Now',
      curriculum_button_1_link: '/awards/curriculum/apply',
      curriculum_button_2_text: 'Know More',
      curriculum_button_2_link: '/awards/curriculum',

      why_title: 'Why Recognition Matters',
      why_description: 'Green Mentors Awards:\n- showcase best practices\n- encourage innovation\n- strengthen institutional visibility\n- inspire collaboration and replication\n- build credibility in sustainability-led education\n- amplify changemakers across the ecosystem',

      process_title: 'How the Awards Process Works',
      step1: 'Submit Nomination',
      step2: 'Review & Evaluation',
      step3: 'Jury / Expert Assessment',
      step4: 'Recognition & Celebration',

      cta_title: 'Celebrate Leadership That Shapes the Future',
      cta_description: 'Invite schools, universities, educators, graduates, and innovators to participate in the Green Mentors awards ecosystem.',
      button_text: 'Submit a Nomination',
      button_link: '/contact',

      meta_title: 'Green Mentors Awards | Sustainable Education Recognition',
      meta_keywords: 'green mentors awards, green school award, green university award, sustainability recognition, education awards',
      meta_description: 'Explore Green Mentors Awards recognizing institutions, educators, graduates, and innovators leading sustainability in education.',
      status: 'Active',
    };
  }
}
