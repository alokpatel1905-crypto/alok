import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccreditationService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.accreditationPage.findFirst();
    if (!existing) {
      return {
        page_title: 'Accreditation',
        subtitle: 'Transforming Education Through Sustainability Frameworks',
        intro_description: 'Green Mentors supports schools, universities, teachers, and graduates through accreditation systems that embed sustainability into learning, leadership, campus practices, and future-ready development.',
        school_title: 'Green School Accreditation',
        school_subtitle: 'Transforming Schools into Living Laboratories of Sustainability',
        school_description: 'The Green School Accreditation program supports schools in integrating sustainability into everyday learning and campus practices.\n\nThrough structured sustainability standards aligned with global frameworks, schools adopt responsible practices related to environmental stewardship, climate education, and sustainable campus management.\n\nAccredited Green Schools demonstrate leadership in preparing students to become climate-conscious citizens and responsible stewards of the planet.',
        school_button_1_text: 'Register Now',
        school_button_1_link: '/register/green-school',
        school_button_2_text: 'Know More',
        school_button_2_link: '/green-school-accreditation',
        university_title: 'Green University Accreditation',
        university_subtitle: 'Universities as Catalysts for Sustainable Innovation',
        university_description: 'The Green University Accreditation program enables universities to become hubs of sustainability leadership, research, and innovation.\n\nThe program evaluates institutions on their commitment to sustainability through academic programs, research initiatives, campus operations, and community impact.\n\nAccredited universities serve as oceans of green opportunities, nurturing graduates who will lead the global transition toward a sustainable economy and society.',
        university_button_1_text: 'Register Now',
        university_button_1_link: '/register/green-university',
        university_button_2_text: 'Know More',
        university_button_2_link: '/green-university-accreditation',
        teacher_title: 'Green Teacher Accreditation',
        teacher_subtitle: 'Empowering Educators to Shape the Future',
        teacher_description: 'Teachers are the architects of the future. The Green Teacher Accreditation program equips educators with the knowledge, pedagogical tools, and sustainability frameworks needed to integrate climate and environmental responsibility into their teaching.\n\nGreen Teachers inspire learners to think critically, act responsibly, and contribute to building a sustainable future for both pupils and the planet.',
        teacher_button_1_text: 'Register Now',
        teacher_button_1_link: '/register/green-teacher',
        teacher_button_2_text: 'Know More',
        teacher_button_2_link: '/green-teacher-accreditation',
        graduate_title: 'Green Graduate Accreditation',
        graduate_subtitle: 'Preparing Graduates to Lead the Green Economy',
        graduate_description: 'Graduates are the leaders, innovators, and decision-makers of tomorrow. The Green Graduate Accreditation program equips students with future-ready green skills to meet the rapidly growing demand for green jobs and green entrepreneurship.\n\nThe program integrates critical areas such as sustainability, climate action, renewable energy, green finance, and environmental governance, enabling graduates to understand and address complex global challenges.\n\nGreen Graduates develop the competencies required to apply sustainability principles in their careers and communities. They emerge as responsible professionals capable of driving innovation, advancing climate solutions, and contributing to a sustainable and resilient future for people and the planet.',
        graduate_button_1_text: 'Register Now',
        graduate_button_1_link: '/register/green-graduate',
        graduate_button_2_text: 'Know More',
        graduate_button_2_link: '/green-graduate-accreditation',
        fellowship_title: 'Greening Education Fellowship',
        fellowship_subtitle: 'Developing Global Leaders for Sustainable Education',
        fellowship_description: 'The Greening Education Fellowship recognizes and mentors educators, researchers, and institutional leaders who are advancing sustainability in education.\n\nFellows gain access to a global community of sustainability leaders, collaborative learning opportunities, and mentorship platforms that strengthen their ability to drive transformation in schools, universities, and communities.\n\nThe fellowship cultivates leaders who can guide institutions toward responsible education systems and climate-conscious learning environments.',
        fellowship_button_1_text: 'Register Now',
        fellowship_button_1_link: '/register/fellowship',
        fellowship_button_2_text: 'Know More',
        fellowship_button_2_link: '/greening-education-fellowship',
        cta_title: 'Start Your Accreditation Journey',
        cta_description: 'Join Green Mentors and help shape responsible, climate-conscious education systems for a sustainable future.',
        primary_button_text: 'Apply Now',
        primary_button_link: '/contact',
        secondary_button_text: 'Contact Us',
        secondary_button_link: '/contact',
        status: 'Active',
      };
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.accreditationPage.findFirst();
    
    // Cleanup generated keys before saving
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;

    if (existing) {
      return this.prisma.accreditationPage.update({
        where: { id: existing.id },
        data: cleanedData,
      });
    } else {
      return this.prisma.accreditationPage.create({
        data: cleanedData,
      });
    }
  }
}
