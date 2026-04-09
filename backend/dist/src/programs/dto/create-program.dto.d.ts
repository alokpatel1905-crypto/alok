export declare class CreateProgramDto {
    title: string;
    slug: string;
    description?: string;
    image?: string;
    status?: 'DRAFT' | 'PUBLISHED';
}
