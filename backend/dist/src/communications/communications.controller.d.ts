import { CommunicationsService } from './communications.service';
export declare class CommunicationsController {
    private readonly communicationsService;
    constructor(communicationsService: CommunicationsService);
    createAnnouncement(body: any): Promise<{
        id: string;
        title: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        priority: string;
    }>;
    findAllAnnouncements(page?: string, limit?: string): Promise<{
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
    subscribe(body: {
        email: string;
        name?: string;
    }): Promise<{
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
    findAllSubscribers(page?: string, limit?: string): Promise<{
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
    broadcast(body: {
        subject: string;
        content: string;
    }): Promise<{
        message: string;
        subscriberCount: number;
    }>;
}
