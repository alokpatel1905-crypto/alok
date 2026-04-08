import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { DocumentCategory } from '@prisma/client';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(DocumentCategory)
  @IsNotEmpty()
  category: DocumentCategory;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @IsString()
  @IsNotEmpty()
  institutionId: string;
}
