import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    findAll(page?: string, limit?: string, category?: string, institutionId?: string): Promise<{
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
            title: string;
            createdAt: Date;
            updatedAt: Date;
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
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
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
            title: string;
            status: import("@prisma/client").$Enums.AccreditationStatus;
            createdAt: Date;
            updatedAt: Date;
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
        title: string;
        createdAt: Date;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DocumentCategory;
        institutionId: string;
        fileUrl: string;
        accreditationId: string | null;
        rankingId: string | null;
    }>;
}
