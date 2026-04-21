import { Controller, Get, Post, Body } from '@nestjs/common';
import { NetworksPageService } from './networks-page.service';

@Controller('networks-page')
export class NetworksPageController {
  constructor(private readonly networksPageService: NetworksPageService) {}

  @Get()
  async getPageConfig() {
    return this.networksPageService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.networksPageService.updatePageConfig(data);
  }
}
