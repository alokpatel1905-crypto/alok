import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';
import { AccreditationStatus } from '@prisma/client';

export class CreateAccreditationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  institutionId: string;

  @IsEnum(AccreditationStatus)
  @IsOptional()
  status?: AccreditationStatus;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @IsString()
  @IsOptional()
  certificateUrl?: string;
}
