import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MilestonesService } from './milestones.service';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}

  @Get('page')
  async getPageConfig() {
    return this.milestonesService.getPageConfig();
  }

  @Post('page/update')
  async updatePageConfig(@Body() data: any) {
    return this.milestonesService.updatePageConfig(data);
  }

  @Get()
  async getAllMilestones() {
    return this.milestonesService.getAllMilestones();
  }

  @Post('add')
  async addMilestone(@Body() data: any) {
    return this.milestonesService.addMilestone(data);
  }

  @Put('update/:id')
  async updateMilestone(@Param('id') id: string, @Body() data: any) {
    return this.milestonesService.updateMilestone(id, data);
  }

  @Delete('delete/:id')
  async deleteMilestone(@Param('id') id: string) {
    return this.milestonesService.deleteMilestone(id);
  }
}
