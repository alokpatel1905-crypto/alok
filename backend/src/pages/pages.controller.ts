import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.pagesService.create(body);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.pagesService.findById(id);
  }
}
