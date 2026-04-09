import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionsController {
    private readonly institutionsService;
    constructor(institutionsService: InstitutionsService);
    create(createInstitutionDto: CreateInstitutionDto, user: any): Promise<{
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
    }>;
    findAll(page?: string, limit?: string, search?: string): Promise<{
        data: ({
            managedBy: {
                id: string;
                name: string;
                email: string;
            };
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        managedBy: {
            id: string;
            name: string;
            email: string;
        };
        accreditations: {
            id: string;
            title: string;
            status: import("@prisma/client").$Enums.AccreditationStatus;
            createdAt: Date;
            updatedAt: Date;
            institutionId: string;
            expiryDate: Date | null;
            certificateUrl: string | null;
        }[];
        rankings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            year: number;
            category: string;
            rank: number;
            score: number | null;
            institutionId: string;
        }[];
        events: {
            id: string;
            title: string;
            description: string | null;
            image: string | null;
            status: import("@prisma/client").$Enums.EventStatus;
            views: number;
            createdAt: Date;
            updatedAt: Date;
            institutionId: string | null;
            startDate: Date;
            endDate: Date | null;
            location: string | null;
            agenda: string | null;
        }[];
        documents: {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            category: import("@prisma/client").$Enums.DocumentCategory;
            institutionId: string;
            fileUrl: string;
            accreditationId: string | null;
            rankingId: string | null;
        }[];
    } & {
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
    }>;
    update(id: string, updateInstitutionDto: UpdateInstitutionDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
