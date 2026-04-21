import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNotificationDto): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.NotificationType;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
    findAllForUser(userId: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            type: import("@prisma/client").$Enums.NotificationType;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isRead: boolean;
            message: string;
            userId: string;
        }[];
        total: number;
        unreadCount: number;
        page: number;
        limit: number;
    }>;
    markAsRead(id: string, userId: string): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.NotificationType;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: string, userId: string): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.NotificationType;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
}
