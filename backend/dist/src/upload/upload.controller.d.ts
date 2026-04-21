import { UploadService } from './upload.service';
import { CloudinaryService } from './cloudinary.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly cloudinaryService;
    constructor(uploadService: UploadService, cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File, req: any): Promise<{
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
    findAll(page?: string, limit?: string): Promise<{
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
