import { PrismaService } from '../prisma/prisma.service';
export declare class SeoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSitemap(): Promise<{
        pages: {
            url: string;
            lastMod: Date;
        }[];
        programs: {
            url: string;
            lastMod: Date;
        }[];
        events: {
            url: string;
            lastMod: Date;
        }[];
    }>;
    updatePageSeo(id: string, data: {
        metaTitle?: string;
        metaDescription?: string;
        schemaMarkup?: string;
    }): Promise<{
        id: string;
        title: string;
        slug: string;
        image: string | null;
        status: import("@prisma/client").$Enums.PageStatus;
        isActive: boolean;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
    }>;
    updateProgramSeo(id: string, data: {
        metaTitle?: string;
        metaDescription?: string;
        schemaMarkup?: string;
    }): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.ProgramStatus;
        isActive: boolean;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSeoStats(): Promise<{
        pages: {
            optimized: number;
            total: number;
        };
        programs: {
            optimized: number;
            total: number;
        };
    }>;
}
