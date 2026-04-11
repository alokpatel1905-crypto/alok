import { PrismaService } from '../prisma/prisma.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
export declare class RankingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRankingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
    findAll(page?: number, limit?: number, category?: string, year?: number): Promise<{
        data: ({
            institution: {
                id: string;
                name: string;
                type: import("@prisma/client").$Enums.InstitutionType;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            year: number;
            category: string;
            rank: number;
            score: number | null;
            institutionId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        institution: {
            id: string;
            name: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import("@prisma/client").$Enums.InstitutionType;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            website: string | null;
            logo: string | null;
            managedById: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
    update(id: string, dto: UpdateRankingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
    getTopRankings(limit?: number): Promise<({
        institution: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    })[]>;
    createSubmission(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        year: number;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        category: string;
        score: number | null;
        institutionId: string;
        reviewerNote: string | null;
        reviewerId: string | null;
    }>;
    findAllSubmissions(page?: number, limit?: number): Promise<({
        institution: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        year: number;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        category: string;
        score: number | null;
        institutionId: string;
        reviewerNote: string | null;
        reviewerId: string | null;
    })[]>;
    evaluateSubmission(id: string, reviewerId: string, reviewerNote: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        year: number;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        category: string;
        score: number | null;
        institutionId: string;
        reviewerNote: string | null;
        reviewerId: string | null;
    }>;
    finalizeResult(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
}
