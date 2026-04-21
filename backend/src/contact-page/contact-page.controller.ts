import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ContactPageService } from './contact-page.service';

@Controller('contact-page')
export class ContactPageController {
  constructor(private readonly contactPageService: ContactPageService) {}

  @Get()
  async getPageConfig() {
    return this.contactPageService.getPageConfig();
  }
  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.contactPageService.updatePageConfig(data);
  }

  @Delete('delete')
  async deletePageConfig() {
    return this.contactPageService.deletePageConfig();
  }
}
