import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // Research Publications
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  createPublication(@Body() body: any) {
    return this.publicationsService.createPublication(body);
  }

  @Get()
  findAllPublications(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('type') type?: string,
  ) {
    return this.publicationsService.findAllPublications(+page, +limit, type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  updatePublication(@Param('id') id: string, @Body() body: any) {
    return this.publicationsService.updatePublication(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  removePublication(@Param('id') id: string) {
    return this.publicationsService.removePublication(id);
  }

  // Press Releases
  @Post('press-releases')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  createPressRelease(@Body() body: any) {
    return this.publicationsService.createPressRelease(body);
  }

  @Get('press-releases')
  findAllPressReleases(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.publicationsService.findAllPressReleases(+page, +limit);
  }

  @Patch('press-releases/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  updatePressRelease(@Param('id') id: string, @Body() body: any) {
    return this.publicationsService.updatePressRelease(id, body);
  }

  @Delete('press-releases/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  removePressRelease(@Param('id') id: string) {
    return this.publicationsService.removePressRelease(id);
  }
}
