import { Controller, Get, Post, Body } from '@nestjs/common';
import { RankingsService } from './rankings.service';

@Controller('rankings-page')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Get()
  async getPageConfig() {
    return this.rankingsService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.rankingsService.updatePageConfig(data);
  }
}
