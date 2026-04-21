import { Controller, Get, Post, Body } from '@nestjs/common';
import { AboutPageService } from './about-page.service';

@Controller('about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  async getAboutPage() {
    return this.aboutPageService.getAboutPage();
  }

  @Post('update')
  async updateAboutPage(@Body() data: any) {
    return this.aboutPageService.updateAboutPage(data);
  }
}
