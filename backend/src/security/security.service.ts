import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) {}

  async logActivity(data: { userId: string; action: string; module: string; details?: string; ipAddress?: string; userAgent?: string }) {
    return this.prisma.auditLog.create({ data });
  }

  async logLogin(data: { email: string; userId?: string; status: string; ipAddress?: string; userAgent?: string }) {
    return this.prisma.loginHistory.create({ data });
  }

  async getAuditLogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
      this.prisma.auditLog.count(),
    ]);
    return { data, total, page, limit };
  }

  async getLoginHistory(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.loginHistory.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      }),
      this.prisma.loginHistory.count(),
    ]);
    return { data, total, page, limit };
  }

  async getSecurityAlerts() {
    // Basic logic: Find failed logins in the last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const failedLogins = await this.prisma.loginHistory.count({
      where: {
        status: 'FAILED',
        createdAt: { gte: last24h },
      },
    });

    return {
      recentFailedLogins: failedLogins,
      isHighRisk: failedLogins > 10,
    };
  }
}
