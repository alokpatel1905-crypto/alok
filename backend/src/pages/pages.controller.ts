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
import { CloudinaryService } from '../upload/cloudinary.service';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.pagesService.create(body);
  }

  @Post('with-image')
  @UseInterceptors(FileInterceptor('file'))
  async createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    let imageUrl = body.image;
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      imageUrl = (result as any).secure_url;
    }

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
  @UseInterceptors(FileInterceptor('file'))
  async updateWithImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    let imageUrl = body.image;
    if (file) {
      // Fetch existing page to delete old image
      const existing = await this.pagesService.findById(id);
      if (existing?.image) {
        await this.cloudinaryService.deleteFileByUrl(existing.image);
      }
      
      const result = await this.cloudinaryService.uploadFile(file);
      imageUrl = (result as any).secure_url;
    }

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

  @Get(':id/history')
  getHistory(@Param('id') id: string) {
    return this.pagesService.getHistory(id);
  }
}