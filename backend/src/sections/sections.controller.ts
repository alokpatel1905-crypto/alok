import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() body: { sectionKey: string; content: any; order?: number; pageId: string }) {
    return this.sectionsService.create(body);
  }

  @Get('page/:pageId')
  findAllByPageId(@Param('pageId') pageId: string) {
    return this.sectionsService.findAllByPageId(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { sectionKey?: string; content?: any; order?: number }) {
    return this.sectionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() body: { ids: string[] }) {
    return this.sectionsService.updateOrder(body.ids);
  }
}
