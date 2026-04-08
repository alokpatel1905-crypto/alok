import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('website')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER', 'CONTENT_EDITOR')
  getWebsiteAnalytics() {
    return this.analyticsService.getWebsiteAnalytics();
  }

  @Get('rankings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER', 'RANKING_REVIEWER')
  getRankingAnalytics() {
    return this.analyticsService.getRankingAnalytics();
  }

  @Get('participation')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  getParticipationReport() {
    return this.analyticsService.getProgramParticipationReport();
  }

  @Post('track')
  trackView(@Body('url') url: string) {
    return this.analyticsService.trackView(url);
  }
}
