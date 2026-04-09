import { AccreditationStatus } from '@prisma/client';
export declare class CreateAccreditationDto {
    title: string;
    institutionId: string;
    status?: AccreditationStatus;
    expiryDate?: string;
    certificateUrl?: string;
}
