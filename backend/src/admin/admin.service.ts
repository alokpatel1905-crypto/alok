import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProgramsService } from '../programs/programs.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly programsService: ProgramsService,
  ) {}

  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      totalInstitutions,
      recentInstitutions,
      totalAccreditations,
      approvedAccreditations,
      totalRankings,
      recentRankings,
      totalEvents,
      upcomingEvents,
      recentEvents,
      totalAwards,
      totalDocuments,
      totalPayments,
      totalRevenue,
      unreadNotifications,
      recentAlerts,
      programCounts,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.institution.count(),
      this.prisma.institution.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      this.prisma.accreditation.count(),
      this.prisma.accreditation.count({ where: { status: 'APPROVED' } }),
      this.prisma.ranking.count(),
      this.prisma.ranking.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { institution: { select: { name: true } } } }),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { status: 'UPCOMING' } }),
      this.prisma.event.findMany({ where: { status: 'UPCOMING' }, take: 5, orderBy: { startDate: 'asc' } }),
      this.prisma.award.count(),
      this.prisma.document.count(),
      this.prisma.payment.count(),
      this.prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      this.prisma.notification.count({ where: { isRead: false } }),
      this.prisma.notification.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      this.programsService.getCounts(),
    ]);

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
  }
}