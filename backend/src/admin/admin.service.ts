import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgramsService } from '../programs/programs.service';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly programsService: ProgramsService,
  ) {}

  async getDashboardStats() {
    try {
      const totalUsers = await this.prisma.user.count();
      const activeUsers = await this.prisma.user.count({ where: { isActive: true } });
      const totalInstitutions = await this.prisma.institution.count();
      const recentInstitutions = await this.prisma.institution.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
      const totalAccreditations = await this.prisma.accreditation.count();
      const approvedAccreditations = await this.prisma.accreditation.count({ where: { status: 'APPROVED' } });
      const totalRankings = await this.prisma.ranking.count();
      const recentRankings = await this.prisma.ranking.findMany({ 
        take: 5, 
        orderBy: { createdAt: 'desc' }, 
        include: { institution: { select: { name: true } } } 
      });
      const totalEvents = await this.prisma.event.count();
      const upcomingEvents = await this.prisma.event.count({ where: { status: 'UPCOMING' } });
      const recentEvents = await this.prisma.event.findMany({ 
        where: { status: 'UPCOMING' }, 
        take: 5, 
        orderBy: { startDate: 'asc' } 
      });
      const totalAwards = await this.prisma.award.count();
      const totalDocuments = await this.prisma.document.count();
      const totalPayments = await this.prisma.payment.count();
      const totalRevenue = await this.prisma.payment.aggregate({ 
        where: { status: 'COMPLETED' }, 
        _sum: { amount: true } 
      });
      const unreadNotifications = await this.prisma.notification.count({ where: { isRead: false } });
      const recentAlerts = await this.prisma.notification.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
      const programCounts = await this.programsService.getCounts();

    return {
      overview: {
        totalUsers,
        activeUsers,
        totalInstitutions,
        recentInstitutions,
      },
      accreditations: {
        total: totalAccreditations,
        approved: approvedAccreditations,
      },
      rankings: {
        total: totalRankings,
        recent: recentRankings,
      },
      events: {
        total: totalEvents,
        upcomingCount: upcomingEvents,
        upcoming: recentEvents,
      },
      awards: { total: totalAwards },
      documents: { total: totalDocuments },
      analytics: {
        totalPayments,
        totalRevenue: totalRevenue._sum.amount || 0,
      },
      alerts: {
        unreadCount: unreadNotifications,
        recent: recentAlerts,
      },
      programs: programCounts,
    };
    } catch (error: any) {
      fs.appendFileSync('error.log', `${new Date().toISOString()} ERROR: ${error.message}\n${error.stack}\n`);
      throw error;
    }
  }
}