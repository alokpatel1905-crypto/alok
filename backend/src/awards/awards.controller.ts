import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('awards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.create(createAwardDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('year') year?: string,
    @Query('status') status?: string,
  ) {
    return this.awardsService.findAll(+page || 1, +limit || 10, search, year ? +year : undefined, status);
  }

  // Nomination Endpoints
  @Post('nominate')
  createNomination(@Body() body: any) {
    return this.awardsService.createNomination(body);
  }

  @Get('nominations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  findAllNominations(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.awardsService.findAllNominations(+page || 1, +limit || 10);
  }

  @Patch('nominations/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  updateNomStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.awardsService.updateNominationStatus(id, status);
  }

  // Archive Management
  @Patch(':id/toggle-archive')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  toggleArchive(@Param('id') id: string) {
    return this.awardsService.toggleArchive(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awardsService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardsService.update(id, updateAwardDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.awardsService.remove(id);
  }
}
