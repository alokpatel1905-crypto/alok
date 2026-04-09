import { InstitutionType } from '@prisma/client';
export declare class CreateInstitutionDto {
    name: string;
    type?: InstitutionType;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    website?: string;
    description?: string;
    logo?: string;
}
