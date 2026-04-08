import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunicationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Announcements
  async createAnnouncement(data: any) {
    return this.prisma.announcement.create({ data });
  }

  async findAllAnnouncements(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.announcement.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.announcement.count(),
    ]);
    return { data, total, page, limit };
  }

  async removeAnnouncement(id: string) {
    return this.prisma.announcement.delete({ where: { id } });
  }

  // Newsletter
  async subscribe(email: string, name?: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (existing.isActive) return existing;
      return this.prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true },
      });
    }
    return this.prisma.newsletterSubscriber.create({ data: { email, name } });
  }

  async unsubscribe(email: string) {
    return this.prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false },
    });
  }

  async findAllSubscribers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.newsletterSubscriber.count(),
    ]);
    return { data, total, page, limit };
  }

  async broadcastNewsletter(data: { subject: string; content: string }) {
    // In a real app, this would integrate with an email service (SendGrid, Mailchimp, etc.)
    const activeSubscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: { email: true },
    });

    console.log(`Broadcasting newsletter "${data.subject}" to ${activeSubscribers.length} subscribers.`);
    
    // Simulate email sending
    return {
      message: 'Newsletter broadcast started',
      subscriberCount: activeSubscribers.length,
    };
  }
}
