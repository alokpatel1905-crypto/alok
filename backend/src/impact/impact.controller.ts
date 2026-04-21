import { Controller, Get, Post, Body } from '@nestjs/common';
import { ImpactService } from './impact.service';

@Controller('impact-page')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @Get()
  async getPageConfig() {
    return this.impactService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.impactService.updatePageConfig(data);
  }
}
