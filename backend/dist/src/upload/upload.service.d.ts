import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(file: Express.Multer.File, userId?: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        uploadedById: string | null;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            uploadedBy: {
                id: string;
                name: string;
            } | null;
        } & {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            filename: string;
            originalname: string;
            mimetype: string;
            size: number;
            uploadedById: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    remove(id: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        uploadedById: string | null;
    }>;
}
