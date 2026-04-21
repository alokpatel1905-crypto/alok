import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEventDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        views: number;
        institutionId: string | null;
        startDate: Date;
        endDate: Date | null;
        location: string | null;
        agenda: string | null;
    }>;
    findAll(page?: number, limit?: number, search?: string, status?: string): Promise<{
        data: ({
            institution: {
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            image: string | null;
            status: import("@prisma/client").$Enums.EventStatus;
            views: number;
            institutionId: string | null;
            startDate: Date;
            endDate: Date | null;
            location: string | null;
            agenda: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        institution: {
            id: string;
            type: import("@prisma/client").$Enums.InstitutionType;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            isActive: boolean;
            description: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            website: string | null;
            logo: string | null;
            managedById: string;
        } | null;
        speakers: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            role: string | null;
            image: string | null;
            bio: string | null;
            eventId: string;
        }[];
        registrations: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            status: string;
            phone: string | null;
            eventId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        views: number;
        institutionId: string | null;
        startDate: Date;
        endDate: Date | null;
        location: string | null;
        agenda: string | null;
    }>;
    addSpeaker(eventId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        role: string | null;
        image: string | null;
        bio: string | null;
        eventId: string;
    }>;
    removeSpeaker(speakerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        role: string | null;
        image: string | null;
        bio: string | null;
        eventId: string;
    }>;
    registerForEvent(eventId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        status: string;
        phone: string | null;
        eventId: string;
    }>;
    updateRegistrationStatus(regId: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        status: string;
        phone: string | null;
        eventId: string;
    }>;
    update(id: string, dto: UpdateEventDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        views: number;
        institutionId: string | null;
        startDate: Date;
        endDate: Date | null;
        location: string | null;
        agenda: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        image: string | null;
        status: import("@prisma/client").$Enums.EventStatus;
        views: number;
        institutionId: string | null;
        startDate: Date;
        endDate: Date | null;
        location: string | null;
        agenda: string | null;
    }>;
    getCounts(): Promise<{
        total: number;
        upcoming: number;
        ongoing: number;
    }>;
}
