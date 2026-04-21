import { PrismaService } from '../prisma/prisma.service';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { UpdateAccreditationDto } from './dto/update-accreditation.dto';
export declare class AccreditationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAccreditationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    findAll(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            institution: {
                id: string;
                type: import("@prisma/client").$Enums.InstitutionType;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            status: import("@prisma/client").$Enums.AccreditationStatus;
            institutionId: string;
            expiryDate: Date | null;
            certificateUrl: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        institution: {
            id: string;
            type: import("@prisma/client").$Enums.InstitutionType;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            isActive: boolean;
            description: string | null;
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
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    update(id: string, dto: UpdateAccreditationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    getCounts(): Promise<{
        total: number;
        approved: number;
        pending: number;
    }>;
}
