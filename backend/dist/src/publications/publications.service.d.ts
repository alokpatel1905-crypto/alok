import { PrismaService } from '../prisma/prisma.service';
export declare class PublicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPublication(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        type: import("@prisma/client").$Enums.PublicationType;
        content: string | null;
        fileUrl: string | null;
        author: string | null;
    }>;
    findAllPublications(page?: number, limit?: number, type?: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            image: string | null;
            status: string;
            type: import("@prisma/client").$Enums.PublicationType;
            content: string | null;
            fileUrl: string | null;
            author: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    updatePublication(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        type: import("@prisma/client").$Enums.PublicationType;
        content: string | null;
        fileUrl: string | null;
        author: string | null;
    }>;
    removePublication(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        type: import("@prisma/client").$Enums.PublicationType;
        content: string | null;
        fileUrl: string | null;
        author: string | null;
    }>;
    createPressRelease(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        content: string;
        date: Date;
    }>;
    findAllPressReleases(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            image: string | null;
            status: string;
            content: string;
            date: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    updatePressRelease(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        content: string;
        date: Date;
    }>;
    removePressRelease(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        content: string;
        date: Date;
    }>;
}
