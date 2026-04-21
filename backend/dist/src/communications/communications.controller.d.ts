import { CommunicationsService } from './communications.service';
export declare class CommunicationsController {
    private readonly communicationsService;
    constructor(communicationsService: CommunicationsService);
    createAnnouncement(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        message: string;
        priority: string;
    }>;
    findAllAnnouncements(page?: string, limit?: string): Promise<{
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
    subscribe(body: {
        email: string;
        name?: string;
    }): Promise<{
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
    findAllSubscribers(page?: string, limit?: string): Promise<{
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
    broadcast(body: {
        subject: string;
        content: string;
    }): Promise<{
        message: string;
        subscriberCount: number;
    }>;
}
