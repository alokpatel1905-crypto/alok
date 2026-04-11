import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<{
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
    findAll(page?: string, limit?: string, search?: string, status?: string): Promise<{
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
            name: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import("@prisma/client").$Enums.InstitutionType;
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
            name: string;
            role: string | null;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            bio: string | null;
            eventId: string;
        }[];
        registrations: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
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
    addSpeaker(id: string, body: any): Promise<{
        id: string;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        bio: string | null;
        eventId: string;
    }>;
    removeSpeaker(speakerId: string): Promise<{
        id: string;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        bio: string | null;
        eventId: string;
    }>;
    register(id: string, body: any): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        phone: string | null;
        eventId: string;
    }>;
    updateRegStatus(regId: string, status: string): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        phone: string | null;
        eventId: string;
    }>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
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
}
