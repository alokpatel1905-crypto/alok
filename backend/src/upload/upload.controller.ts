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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          _req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const cleanName = file.originalname.replace(/\s+/g, '-');
          const uniqueName = `${Date.now()}-${cleanName}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    return this.uploadService.create(file, req.user.sub);
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
