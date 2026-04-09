import { AccreditationsService } from './accreditations.service';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { UpdateAccreditationDto } from './dto/update-accreditation.dto';
export declare class AccreditationsController {
    private readonly accreditationsService;
    constructor(accreditationsService: AccreditationsService);
    create(createAccreditationDto: CreateAccreditationDto): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    findAll(page?: string, limit?: string, status?: string): Promise<{
        data: ({
            institution: {
                id: string;
                name: string;
                type: import("@prisma/client").$Enums.InstitutionType;
            };
        } & {
            id: string;
            title: string;
            status: import("@prisma/client").$Enums.AccreditationStatus;
            createdAt: Date;
            updatedAt: Date;
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
    } & {
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    update(id: string, updateAccreditationDto: UpdateAccreditationDto): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.AccreditationStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        expiryDate: Date | null;
        certificateUrl: string | null;
    }>;
}
