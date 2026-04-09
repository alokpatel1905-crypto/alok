import { PaymentStatus } from '@prisma/client';
export declare class CreatePaymentDto {
    amount: number;
    currency?: string;
    status?: PaymentStatus;
    provider?: string;
    transactionId?: string;
    description?: string;
    institutionId: string;
}
