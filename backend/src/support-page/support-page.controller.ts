import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { SupportPageService } from './support-page.service';

@Controller('support-page')
export class SupportPageController {
  constructor(private readonly supportPageService: SupportPageService) {}

  @Get()
  async getPageConfig() {
    return this.supportPageService.getPageConfig();
  }
  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.supportPageService.updatePageConfig(data);
  }

  @Delete('delete')
  async deletePageConfig() {
    return this.supportPageService.deletePageConfig();
  }
}
