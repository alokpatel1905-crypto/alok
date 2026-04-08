import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.eventsService.findAll(+page || 1, +limit || 10, search, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // Speaker Management
  @Post(':id/speakers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  addSpeaker(@Param('id') id: string, @Body() body: any) {
    return this.eventsService.addSpeaker(id, body);
  }

  @Delete('speakers/:speakerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  removeSpeaker(@Param('speakerId') speakerId: string) {
    return this.eventsService.removeSpeaker(speakerId);
  }

  // Registration
  @Post(':id/register')
  register(@Param('id') id: string, @Body() body: any) {
    return this.eventsService.registerForEvent(id, body);
  }

  @Patch('registrations/:regId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  updateRegStatus(@Param('regId') regId: string, @Body('status') status: string) {
    return this.eventsService.updateRegistrationStatus(regId, status);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
