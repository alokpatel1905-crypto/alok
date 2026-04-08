import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  // Announcements
  @Post('announcements')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  createAnnouncement(@Body() body: any) {
    return this.communicationsService.createAnnouncement(body);
  }

  @Get('announcements')
  findAllAnnouncements(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.communicationsService.findAllAnnouncements(+page, +limit);
  }

  @Delete('announcements/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  removeAnnouncement(@Param('id') id: string) {
    return this.communicationsService.removeAnnouncement(id);
  }

  // Newsletter
  @Post('newsletter/subscribe')
  subscribe(@Body() body: { email: string; name?: string }) {
    return this.communicationsService.subscribe(body.email, body.name);
  }

  @Post('newsletter/unsubscribe')
  unsubscribe(@Body('email') email: string) {
    return this.communicationsService.unsubscribe(email);
  }

  @Get('newsletter/subscribers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  findAllSubscribers(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.communicationsService.findAllSubscribers(+page, +limit);
  }

  @Post('newsletter/broadcast')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  broadcast(@Body() body: { subject: string; content: string }) {
    return this.communicationsService.broadcastNewsletter(body);
  }
}
