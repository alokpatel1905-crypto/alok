import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('rankings-page')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Get()
  async getPageConfig() {
    return this.rankingsService.getPageConfig();
  }

  @Post('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_EDITOR')
  async updatePageConfig(@Body() data: any) {
    return this.rankingsService.updatePageConfig(data);
  }
}

@Controller('rankings')
export class RankingsDataController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER', 'RANKING_REVIEWER', 'CONTENT_EDITOR')
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
  ) {
    return this.rankingsService.findAll(+page || 1, +limit || 10, category);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER', 'RANKING_REVIEWER')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingsService.update(id, updateRankingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(id);
  }
}
