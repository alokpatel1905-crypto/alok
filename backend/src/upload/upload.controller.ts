import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ── Protected admin upload ────────────────────────────────────────────────
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const result = await this.cloudinaryService.uploadFile(file);
    return this.uploadService.create(file, result, req.user.sub);
  }

  // ── Public upload for Audit Form attachments (no login required) ──────────
  @Post('audit-attachment')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAuditAttachment(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    const result = await this.cloudinaryService.uploadFile(file);
    return { url: (result as any).secure_url, publicId: (result as any).public_id };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '20') {
    return this.uploadService.findAll(+page, +limit);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}

