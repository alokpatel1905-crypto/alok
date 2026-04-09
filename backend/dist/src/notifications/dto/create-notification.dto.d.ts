import { NotificationType } from '@prisma/client';
export declare class CreateNotificationDto {
    title: string;
    message: string;
    type?: NotificationType;
    userId: string;
}
