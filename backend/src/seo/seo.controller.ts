import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('sitemap')
  getSitemap() {
    return this.seoService.getSitemap();
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  getStats() {
    return this.seoService.getSeoStats();
  }

  @Patch('page/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  updatePageSeo(@Param('id') id: string, @Body() body: any) {
    return this.seoService.updatePageSeo(id, body);
  }

  @Patch('program/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  updateProgramSeo(@Param('id') id: string, @Body() body: any) {
    return this.seoService.updateProgramSeo(id, body);
  }
}
