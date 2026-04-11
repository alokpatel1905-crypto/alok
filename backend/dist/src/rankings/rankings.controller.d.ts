import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
export declare class RankingsController {
    private readonly rankingsService;
    constructor(rankingsService: RankingsService);
    create(createRankingDto: CreateRankingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        rank: number;
        score: number | null;
        institutionId: string;
    }>;
    findAll(page?: string, limit?: string, category?: string, year?: string): Promise<{
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
    getTop(limit?: string): Promise<({
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
    createSubmission(body: any): Promise<{
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
    findAllSubmissions(page?: string, limit?: string): Promise<({
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
    evaluate(id: string, body: {
        reviewerId: string;
        note: string;
    }): Promise<{
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
    update(id: string, updateRankingDto: UpdateRankingDto): Promise<{
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
}
