import { PrismaService } from '../prisma/prisma.service';
export declare class CommunicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAnnouncement(data: any): Promise<{
        id: string;
        title: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        priority: string;
    }>;
    findAllAnnouncements(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            title: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            message: string;
            priority: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    removeAnnouncement(id: string): Promise<{
        id: string;
        title: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        priority: string;
    }>;
    subscribe(email: string, name?: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string | null;
        email: string;
    }>;
    unsubscribe(email: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string | null;
        email: string;
    }>;
    findAllSubscribers(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            name: string | null;
            email: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    broadcastNewsletter(data: {
        subject: string;
        content: string;
    }): Promise<{
        message: string;
        subscriberCount: number;
    }>;
}
