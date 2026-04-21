import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';
export declare class UploadService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    create(file: Express.Multer.File, cloudinaryResult: any, userId?: string): Promise<{
        url: string;
        id: string;
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        type: string;
        createdAt: Date;
        updatedAt: Date;
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
            filename: string;
            originalname: string;
            mimetype: string;
            size: number;
            type: string;
            createdAt: Date;
            updatedAt: Date;
            uploadedById: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    remove(id: string): Promise<{
        url: string;
        id: string;
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        uploadedById: string | null;
    }>;
}
