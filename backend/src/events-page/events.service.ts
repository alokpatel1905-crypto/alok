import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getPageConfig() {
    const existing = await this.prisma.eventsPage.findFirst({
        include: {
            upcoming_events: {
                orderBy: { sort_order: 'asc' }
            }
        }
    });

    if (!existing) {
      return {
        page_title: 'Events',
        subtitle: 'Global Platforms for Sustainable Education Dialogue',
        intro_description: 'Green Mentors events bring together educators, institutions, policymakers, and global leaders to advance sustainability and climate-conscious education systems.',
        
        event1_title: 'NYC Green School Conference',
        event1_subtitle: 'Advancing Sustainability in School Education',
        event1_description: 'This conference gathers school leaders, educators, and partners to explore best practices and innovative approaches for integrating sustainability into K-12 education.\n\nIt promotes collaboration, knowledge exchange, and institutional transformation toward green schools.',
        event1_location: 'New York, USA',
        event1_date: 'September 2026',
        event1_button1_text: 'Register',
        event1_button1_link: '/events/nyc-school',
        event1_button2_text: 'Know More',
        event1_button2_link: '/events/nyc-school-details',

        event2_title: 'NYC Children’s Climate Conference',
        event2_subtitle: 'Empowering Young Voices for Climate Action',
        event2_description: 'This event creates a platform for children and youth to engage in climate dialogue, build awareness, and take leadership roles in shaping a sustainable future.',
        event2_location: 'New York, USA',
        event2_date: 'September 2026',
        event2_button1_text: 'Register',
        event2_button1_link: '/events/children-climate',
        event2_button2_text: 'Know More',
        event2_button2_link: '/events/children-climate-details',

        event3_title: 'World Education Forum – Davos',
        event3_subtitle: 'Connecting Education with Global Sustainability Agendas',
        event3_description: 'This forum brings together global leaders, institutions, and policymakers to discuss the future of education and sustainability.\n\nIt fosters high-level dialogue on innovation, leadership, and systemic transformation.',
        event3_location: 'Davos, Switzerland',
        event3_date: 'January 2027',
        event3_button1_text: 'Register',
        event3_button1_link: '/events/davos',
        event3_button2_text: 'Know More',
        event3_button2_link: '/events/davos-details',

        event4_title: 'Global Green Mentors Conference',
        event4_subtitle: 'A Global Platform for Collaboration and Recognition',
        event4_description: 'This flagship conference brings together schools, universities, educators, graduates, and partners to collaborate, share knowledge, and celebrate sustainability leadership.',
        event4_location: 'Global / Hybrid',
        event4_date: 'April 2027',
        event4_button1_text: 'Register',
        event4_button1_link: '/events/global-conference',
        event4_button2_text: 'Know More',
        event4_button2_link: '/events/global-conference-details',

        upcoming_events: [],

        why_title: 'Why Attend Green Mentors Events',
        why_description: 'Attending Green Mentors events provides opportunities to:\n- network with global institutions\n- gain sustainability insights\n- collaborate with leaders\n- showcase institutional initiatives\n- participate in global dialogue',

        cta_title: 'Join the Global Conversation',
        cta_description: 'Participate in Green Mentors events and contribute to sustainability-led education worldwide.',
        button_text: 'Register Now',
        button_link: '/contact',

        meta_title: 'Green Mentors Events | Global Sustainability Conferences',
        meta_keywords: 'green mentors events, sustainability conferences, education events, climate education',
        meta_description: 'Explore Green Mentors global events, conferences, and sustainability platforms for education leaders.',
        status: 'Active',
      };
    }
    return existing;
  }

  async updatePageConfig(data: any) {
    const existing = await this.prisma.eventsPage.findFirst();
    
    // Separate the nested array
    const upcomingEvents = data.upcoming_events || [];
    
    const cleanedData = { ...data };
    delete cleanedData.id;
    delete cleanedData.created_at;
    delete cleanedData.updated_at;
    delete cleanedData.upcoming_events; // Array processed via relation mapping
    
    const formattedEvents = upcomingEvents.map((ev: any, index: number) => ({
      name: ev.name || '',
      location: ev.location || '',
      date: ev.date || '',
      description: ev.description || '',
      link: ev.link || '',
      sort_order: index,
    }));

    if (existing) {
      return this.prisma.eventsPage.update({
        where: { id: existing.id },
        data: {
          ...cleanedData,
          upcoming_events: {
            deleteMany: {}, // Clear old nodes
            create: formattedEvents // create new
          }
        },
        include: { upcoming_events: true }
      });
    } else {
      return this.prisma.eventsPage.create({
        data: {
          ...cleanedData,
          upcoming_events: {
            create: formattedEvents
          }
        },
        include: { upcoming_events: true }
      });
    }
  }
}
