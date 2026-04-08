import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Injectable()
export class RankingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRankingDto) {
    const institution = await this.prisma.institution.findUnique({
      where: { id: dto.institutionId },
    });

    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    return this.prisma.ranking.create({
      data: {
        category: dto.category,
        rank: dto.rank,
        year: dto.year,
        score: dto.score,
        institutionId: dto.institutionId,
      },
    });
  }

  async findAll(page = 1, limit = 10, category?: string, year?: number) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (year) {
      where.year = +year;
    }

    const [data, total] = await Promise.all([
      this.prisma.ranking.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ year: 'desc' }, { rank: 'asc' }],
        include: {
          institution: {
            select: { id: true, name: true, type: true },
          },
        },
      }),
      this.prisma.ranking.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const ranking = await this.prisma.ranking.findUnique({
      where: { id },
      include: {
        institution: true,
      },
    });

    if (!ranking) {
      throw new NotFoundException('Ranking not found');
    }

    return ranking;
  }

  async update(id: string, dto: UpdateRankingDto) {
    await this.findOne(id);

    return this.prisma.ranking.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.ranking.delete({ where: { id } });
  }

  async getTopRankings(limit = 5) {
    return this.prisma.ranking.findMany({
      take: limit,
      orderBy: [{ rank: 'asc' }],
      include: {
        institution: {
          select: { name: true },
        },
      },
    });
  }

  // Future Scalability: Submission Portal Logic
  async createSubmission(data: any) {
    return this.prisma.rankingSubmission.create({
      data: {
        ...data,
        status: 'SUBMITTED',
      },
    });
  }

  async findAllSubmissions(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.rankingSubmission.findMany({
      skip,
      take: limit,
      include: { institution: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Automated Ranking Score Calculation
  async evaluateSubmission(id: string, reviewerId: string, reviewerNote: string) {
    const submission = await this.prisma.rankingSubmission.findUnique({
      where: { id },
    });

    if (!submission) throw new Error('Submission not found');

    // Automated Scoring Algorithm (Scalable)
    // Based on hypothetical data points in submission.data JSON
    const data = (submission.data as any) || {};
    let calculatedScore = 0;

    // Example Criteria
    if (data.energyEfficiency) calculatedScore += (data.energyEfficiency * 0.4);
    if (data.wasteManagement) calculatedScore += (data.wasteManagement * 0.3);
    if (data.curriculumIntegration) calculatedScore += (data.curriculumIntegration * 0.3);

    return this.prisma.rankingSubmission.update({
      where: { id },
      data: {
        status: 'UNDER_REVIEW',
        score: calculatedScore,
        reviewerId,
        reviewerNote,
      },
    });
  }

  async finalizeResult(id: string) {
    const sub = await this.prisma.rankingSubmission.findUnique({ where: { id } });
    if (!sub || !sub.score) throw new Error('Ready for finalization? No score found.');

    // Convert submission to final ranking result
    return this.prisma.ranking.create({
      data: {
        category: sub.category,
        year: sub.year,
        score: sub.score,
        rank: 0, // Will be calculated after batch finalization
        institutionId: sub.institutionId,
      },
    });
  }
}
