import { EventStatus } from '@prisma/client';
export declare class CreateEventDto {
    title: string;
    description?: string;
    startDate: string;
    endDate?: string;
    location?: string;
    status?: EventStatus;
    image?: string;
    institutionId?: string;
}
