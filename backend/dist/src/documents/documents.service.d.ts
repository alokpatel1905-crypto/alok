import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDocumentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    findAll(page?: number, limit?: number, category?: string, institutionId?: string): Promise<{
        data: ({
            institution: {
                name: string;
            };
            accreditation: {
                title: string;
            } | null;
            ranking: {
                year: number;
                category: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            category: import("@prisma/client").$Enums.DocumentCategory;
            institutionId: string;
            fileUrl: string;
            accreditationId: string | null;
            rankingId: string | null;
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
        accreditation: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            status: import("@prisma/client").$Enums.AccreditationStatus;
            institutionId: string;
            expiryDate: Date | null;
            certificateUrl: string | null;
        } | null;
        ranking: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            year: number;
            category: string;
            rank: number;
            score: number | null;
            institutionId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    update(id: string, dto: UpdateDocumentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
}
