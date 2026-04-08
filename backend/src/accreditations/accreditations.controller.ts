import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AccreditationsService } from './accreditations.service';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { UpdateAccreditationDto } from './dto/update-accreditation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('accreditations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccreditationsController {
  constructor(private readonly accreditationsService: AccreditationsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER', 'INSTITUTION_USER')
  create(@Body() createAccreditationDto: CreateAccreditationDto) {
    return this.accreditationsService.create(createAccreditationDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: string,
  ) {
    return this.accreditationsService.findAll(+page || 1, +limit || 10, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accreditationsService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'RANKING_REVIEWER')
  update(@Param('id') id: string, @Body() updateAccreditationDto: UpdateAccreditationDto) {
    return this.accreditationsService.update(id, updateAccreditationDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.accreditationsService.remove(id);
  }
}
