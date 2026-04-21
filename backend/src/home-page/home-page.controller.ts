import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get()
  async getHomePage() {
    return this.homePageService.getHomePage();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateHomePage(@Body() data: any) {
    return this.homePageService.updateHomePage(data);
  }
}
