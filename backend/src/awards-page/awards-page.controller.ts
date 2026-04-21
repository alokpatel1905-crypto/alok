import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwardsPageService } from './awards-page.service';

@Controller('awards-page')
export class AwardsPageController {
  constructor(private readonly awardsPageService: AwardsPageService) {}

  @Get()
  async getPageConfig() {
    return this.awardsPageService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.awardsPageService.updatePageConfig(data);
  }
}
