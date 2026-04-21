import { PrismaService } from '../prisma/prisma.service';
export declare class PagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        slug: string;
        metaTitle?: string;
        metaDescription?: string;
        status?: 'DRAFT' | 'PUBLISHED';
        sections?: any[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    } | null>;
    findAll(): Promise<({
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            sectionKey: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    })[]>;
    findPublished(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }[]>;
    findPublishedBySlug(slug: string): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            sectionKey: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }>;
    findBySlug(slug: string): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            sectionKey: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }>;
    update(id: string, data: {
        title?: string;
        slug?: string;
        metaTitle?: string;
        metaDescription?: string;
        status?: 'DRAFT' | 'PUBLISHED';
        isActive?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }>;
    findById(id: string): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            sectionKey: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.PageStatus;
        views: number;
        metaTitle: string | null;
        metaDescription: string | null;
        schemaMarkup: string | null;
    }>;
}
