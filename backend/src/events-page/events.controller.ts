import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events-page')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getPageConfig() {
    return this.eventsService.getPageConfig();
  }

  @Post('update')
  async updatePageConfig(@Body() data: any) {
    return this.eventsService.updatePageConfig(data);
  }
}
