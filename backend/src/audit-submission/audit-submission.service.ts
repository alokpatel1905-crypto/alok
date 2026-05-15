import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditSubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const { profile, sections, consent, submittedAt } = data;
    return this.prisma.auditSubmission.create({
      data: {
        schoolName: profile?.schoolName || 'Unknown',
        udise: profile?.udise,
        schoolCategory: profile?.schoolCategory,
        gradeLevels: profile?.gradeLevels || [],
        medium: profile?.medium,
        board: profile?.board,
        address: profile?.address,
        village: profile?.village,
        district: profile?.district,
        taluka: profile?.taluka,
        pinCode: profile?.pinCode,
        principalName: profile?.principalName,
        mobile: profile?.mobile,
        email: profile?.email,
        yearEstablished: profile?.yearEstablished,
        totalStudents: profile?.totalStudents,
        totalTeachingStaff: profile?.totalTeachingStaff,
        nonTeachingStaff: profile?.nonTeachingStaff,
        sections: sections ?? {},
        submitterName: consent?.submitterName,
        designation: consent?.designation,
        submissionDate: consent?.submissionDate,
        submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      },
    });
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.auditSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          schoolName: true,
          udise: true,
          schoolCategory: true,
          district: true,
          principalName: true,
          email: true,
          mobile: true,
          status: true,
          submittedAt: true,
          createdAt: true,
        },
      }),
      this.prisma.auditSubmission.count({ where }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const record = await this.prisma.auditSubmission.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Audit submission not found');
    return record;
  }

  async updateStatus(id: string, status: string, reviewNote?: string) {
    await this.findOne(id); // ensure exists
    return this.prisma.auditSubmission.update({
      where: { id },
      data: { status: status as any, ...(reviewNote !== undefined ? { reviewNote } : {}) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.auditSubmission.delete({ where: { id } });
  }
}
