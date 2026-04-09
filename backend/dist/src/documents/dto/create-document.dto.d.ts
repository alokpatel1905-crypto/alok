import { DocumentCategory } from '@prisma/client';
export declare class CreateDocumentDto {
    title: string;
    category: DocumentCategory;
    fileUrl: string;
    institutionId: string;
}
