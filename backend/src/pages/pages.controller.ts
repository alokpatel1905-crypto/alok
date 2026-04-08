import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() body: any) {
    return this.pagesService.create(body);
  }

  @Post('with-image')
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
  createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const imageUrl = file
      ? `${process.env.BASE_URL || 'http://127.0.0.1:4000'}/uploads/${file.filename}`
      : undefined;

    return this.pagesService.create({
      ...body,
      image: imageUrl,
    });
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get('public')
  findPublished() {
    return this.pagesService.findPublished();
  }

  @Get('public/:slug')
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.pagesService.findPublishedBySlug(slug);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.pagesService.update(id, body);
  }

  @Patch(':id/with-image')
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
  updateWithImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const imageUrl = file
      ? `${process.env.BASE_URL}/uploads/${file.filename}`
      : body.image;

    return this.pagesService.update(id, {
      ...body,
      image: imageUrl,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.pagesService.findById(id);
  }
}