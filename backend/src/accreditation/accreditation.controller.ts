import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';

@Controller('accreditation-page')
export class AccreditationController {
  constructor(private readonly authService: AccreditationService) {}

  @Get()
  async getPageConfig() {
    return this.authService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.authService.updatePageConfig(data);
  }
}
