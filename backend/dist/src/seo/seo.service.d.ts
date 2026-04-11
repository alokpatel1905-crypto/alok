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
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        image: string | null;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    updateProgramSeo(id: string, data: {
        metaTitle?: string;
        metaDescription?: string;
        schemaMarkup?: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.ProgramStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
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
