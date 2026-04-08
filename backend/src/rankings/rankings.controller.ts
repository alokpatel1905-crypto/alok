import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('rankings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingsService.create(createRankingDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
    @Query('year') year?: string,
  ) {
    return this.rankingsService.findAll(+page, +limit, category, year ? +year : undefined);
  }

  @Get('top')
  getTop(@Query('limit') limit: string = '5') {
    return this.rankingsService.getTopRankings(+limit);
  }

  // Future Scalability Endpoints
  @Post('submit')
  createSubmission(@Body() body: any) {
    return this.rankingsService.createSubmission(body);
  }

  @Get('submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'RANKING_REVIEWER')
  findAllSubmissions(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.rankingsService.findAllSubmissions(+page, +limit);
  }

  @Patch('submissions/:id/evaluate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RANKING_REVIEWER', 'SUPER_ADMIN')
  evaluate(@Param('id') id: string, @Body() body: { reviewerId: string; note: string }) {
    return this.rankingsService.evaluateSubmission(id, body.reviewerId, body.note);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingsService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingsService.update(id, updateRankingDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.rankingsService.remove(id);
  }
}
