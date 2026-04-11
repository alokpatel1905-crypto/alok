import { PublicationsService } from './publications.service';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    createPublication(body: any): Promise<{
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
    findAllPublications(page?: string, limit?: string, type?: string): Promise<{
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
    updatePublication(id: string, body: any): Promise<{
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
    createPressRelease(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        image: string | null;
        status: string;
        content: string;
        date: Date;
    }>;
    findAllPressReleases(page?: string, limit?: string): Promise<{
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
    updatePressRelease(id: string, body: any): Promise<{
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
