import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePaymentDto): Promise<{
        id: string;
        description: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        amount: number;
        currency: string;
        provider: string | null;
        transactionId: string | null;
    }>;
    findAll(page?: number, limit?: number, status?: string, institutionId?: string): Promise<{
        data: ({
            institution: {
                name: string;
            };
        } & {
            id: string;
            description: string | null;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            institutionId: string;
            amount: number;
            currency: string;
            provider: string | null;
            transactionId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        institution: {
            id: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            type: import("@prisma/client").$Enums.InstitutionType;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            website: string | null;
            logo: string | null;
            managedById: string;
        };
    } & {
        id: string;
        description: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        amount: number;
        currency: string;
        provider: string | null;
        transactionId: string | null;
    }>;
    update(id: string, dto: UpdatePaymentDto): Promise<{
        id: string;
        description: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        amount: number;
        currency: string;
        provider: string | null;
        transactionId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        description: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        amount: number;
        currency: string;
        provider: string | null;
        transactionId: string | null;
    }>;
    getRevenueStats(): Promise<{
        totalRevenue: number;
        pendingRevenue: number;
    }>;
    generateInvoice(id: string): Promise<{
        invoiceNumber: string;
        date: Date;
        institution: {
            id: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            type: import("@prisma/client").$Enums.InstitutionType;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            website: string | null;
            logo: string | null;
            managedById: string;
        };
        amount: number;
        currency: string;
        status: import("@prisma/client").$Enums.PaymentStatus;
        description: string;
        company: {
            name: string;
            address: string;
            email: string;
        };
    }>;
}
