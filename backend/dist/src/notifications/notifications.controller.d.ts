import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
    findAll(user: any, page?: string, limit?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("@prisma/client").$Enums.NotificationType;
            isRead: boolean;
            message: string;
            userId: string;
        }[];
        total: number;
        unreadCount: number;
        page: number;
        limit: number;
    }>;
    markAllAsRead(user: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAsRead(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.NotificationType;
        isRead: boolean;
        message: string;
        userId: string;
    }>;
}
