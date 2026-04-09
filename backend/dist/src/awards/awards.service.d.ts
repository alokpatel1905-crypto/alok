import { PrismaService } from '../prisma/prisma.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
export declare class AwardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAwardDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.AwardStatus;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        institutionId: string;
    }>;
    findAll(page?: number, limit?: number, search?: string, year?: number, status?: any): Promise<{
        data: ({
            institution: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            title: string;
            description: string | null;
            image: string | null;
            status: import("@prisma/client").$Enums.AwardStatus;
            createdAt: Date;
            updatedAt: Date;
            year: number;
            category: string;
            institutionId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    createNomination(data: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        institutionId: string | null;
        awardTitle: string;
        nomineeName: string;
        nomineeEmail: string;
        reason: string | null;
    }>;
    findAllNominations(page?: number, limit?: number): Promise<{
        data: ({
            institution: {
                name: string;
            } | null;
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            institutionId: string | null;
            awardTitle: string;
            nomineeName: string;
            nomineeEmail: string;
            reason: string | null;
        })[];
        total: number;
    }>;
    updateNominationStatus(id: string, status: string): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        institutionId: string | null;
        awardTitle: string;
        nomineeName: string;
        nomineeEmail: string;
        reason: string | null;
    }>;
    toggleArchive(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.AwardStatus;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        institutionId: string;
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
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.AwardStatus;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        institutionId: string;
    }>;
    update(id: string, dto: UpdateAwardDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.AwardStatus;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        institutionId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.AwardStatus;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        category: string;
        institutionId: string;
    }>;
    getCounts(): Promise<number>;
}
