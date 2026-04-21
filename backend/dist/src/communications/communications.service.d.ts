import { PrismaService } from '../prisma/prisma.service';
export declare class CommunicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAnnouncement(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        message: string;
        priority: string;
    }>;
    findAllAnnouncements(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            title: string;
            message: string;
            priority: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    removeAnnouncement(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        message: string;
        priority: string;
    }>;
    subscribe(email: string, name?: string): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        isActive: boolean;
    }>;
    unsubscribe(email: string): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        isActive: boolean;
    }>;
    findAllSubscribers(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            name: string | null;
            email: string;
            isActive: boolean;
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
