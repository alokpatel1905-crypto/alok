import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactPageService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    try {
      const existing = await this.prisma.contactPage.findFirst();
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
      const existing = await this.prisma.contactPage.findFirst();
      const cleanedData = { ...data };
      delete cleanedData.id;
      delete cleanedData.created_at;
      delete cleanedData.updated_at;

      if (existing) {
        return this.prisma.contactPage.update({ where: { id: existing.id }, data: cleanedData });
      } else {
        return this.prisma.contactPage.create({ data: cleanedData });
      }
    } catch (error) {
      if (error.code === 'P2021' || error.message?.includes('does not exist')) {
        const cleanedData = { ...data };
        delete cleanedData.id;
        delete cleanedData.created_at;
        delete cleanedData.updated_at;
        return this.prisma.contactPage.create({ data: cleanedData });
      }
      throw error;
    }
  }

  // Delete the existing ContactPage configuration
  async deletePageConfig() {
    const existing = await this.prisma.contactPage.findFirst();
    if (existing) {
      return this.prisma.contactPage.delete({ where: { id: existing.id } });
    }
    return { message: 'No ContactPage record to delete' };
  }

  private getDefaults() {
    return {
      page_title: 'Contact Us',
      subtitle: 'Let\'s Connect for Sustainable Education',
      intro_description: 'Green Mentors welcomes inquiries from institutions, educators, partners, media, and supporters working toward sustainability and responsible education systems worldwide.',

      form_title: 'Send Us a Message',
      show_name: true,
      show_email: true,
      show_phone: false,
      show_organization: false,
      show_subject: true,
      show_message: true,
      button_text: 'Submit Inquiry',
      success_message: 'Thank you for contacting Green Mentors. Our team will respond shortly.',

      email_general: 'hello@greenmentors.org',
      email_partnership: 'partnerships@greenmentors.org',
      email_media: 'media@greenmentors.org',
      email_events: 'events@greenmentors.org',
      phone: '+91-XXXXXXXXXX',
      address: 'Global initiative with presence across multiple countries, with roots in India.',
      response_time: 'We aim to respond within 2–3 business days.',

      facebook: 'https://facebook.com/greenmentors',
      linkedin: 'https://linkedin.com/company/greenmentors',
      twitter: 'https://twitter.com/greenmentors',
      instagram: 'https://instagram.com/greenmentors',

      who_title: 'Who Can Reach Out',
      who_description: '- Schools and Universities for accreditation and rankings\n- Educators for programs and recognition\n- Media for interviews and coverage\n- Partners and sponsors for collaboration\n- Students and graduates for participation',

      global_title: 'A Global Mission',
      global_description: 'Green Mentors operates across multiple countries and territories, connecting institutions, educators, and leaders worldwide to drive sustainability in education.',

      faq_q1: 'How long does it take to get a response?',
      faq_a1: 'We typically respond within 2–3 business days.',
      faq_q2: 'Can institutions request partnerships?',
      faq_a2: 'Yes, institutions can contact us for collaboration and partnership opportunities.',

      cta_title: 'Start the Conversation',
      cta_description: 'Connect with Green Mentors and explore collaboration for sustainability-led education.',
      cta_button_text: 'Send Inquiry',
      cta_button_link: '/contact',

      meta_title: 'Contact Green Mentors | Sustainability in Education',
      meta_keywords: 'contact green mentors, education partnership contact, sustainability inquiry',
      meta_description: 'Contact Green Mentors for partnerships, accreditation, events, and sustainability-led education initiatives.',
      status: 'Active',
    };
  }

  // New method to handle contact form submissions
  async submitContactForm(data: any) {
    // Expected fields: full_name, email, organization, inquiry_type, subject, message
    const { full_name, email, organization, inquiry_type, subject, message } = data;
    return (this.prisma as any).contactMessage.create({
      data: {
        full_name,
        email,
        organization,
        inquiry_type,
        subject,
        message,
        status: 'New',
      },
    });
  }

}
