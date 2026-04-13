import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../upload/cloudinary.service';

@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
    @Query('status') status = '',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('isActive') isActive = '',
  ) {
    return this.programsService.findAll(
    Number(page),
    Number(limit),
    search,
    status,
    sortBy,
    order,
    isActive,
    );

  }

  @Get('public')
  findPublished() {
    return this.programsService.findPublished();
  }

  @Get('public/:slug')
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.programsService.findPublishedBySlug(slug);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.programsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  update(@Param('id') id: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  toggleActive(@Param('id') id: string) {
    return this.programsService.toggleActive(id);
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  toggleStatus(@Param('id') id: string) {
    return this.programsService.toggleStatus(id);
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  findById(@Param('id') id: string) {
    return this.programsService.findById(id);
  }

  @Get('counts/summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  getCounts() {
    return this.programsService.getCounts();
  }

  @Post('with-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  @UseInterceptors(FileInterceptor('file'))
  async createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!body.slug) {
      throw new BadRequestException('Slug is required');
    }

    let imageUrl = body.image;
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      imageUrl = result.secure_url;
    }

    return this.programsService.create({
      ...body,
      image: imageUrl,
    });
  }


  @Patch(':id/with-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
  @UseInterceptors(FileInterceptor('file'))
  async updateWithImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    let imageUrl = body.image;
    if (file) {
      // Fetch existing program to delete old image
      const existing = await this.programsService.findById(id);
      if (existing?.image) {
        await this.cloudinaryService.deleteFileByUrl(existing.image);
      }
      
      const result = await this.cloudinaryService.uploadFile(file);
      imageUrl = (result as any).secure_url;
    }

    return this.programsService.update(id, {
      ...body,
      image: imageUrl,
    });
  }


}