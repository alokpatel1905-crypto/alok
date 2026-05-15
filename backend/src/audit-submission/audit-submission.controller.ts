import {
  Controller, Get, Post, Body, Param, Delete, Query, Patch, UseGuards,
} from '@nestjs/common';
import { AuditSubmissionService } from './audit-submission.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

// ── Public endpoint (no auth) ─────────────────────────────────────────────────
@Controller('audit-submit')
export class AuditSubmitController {
  constructor(private readonly service: AuditSubmissionService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }
}

// ── Admin endpoints (JWT-protected) ──────────────────────────────────────────
@Controller('admin/audit-submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PROGRAM_MANAGER')
export class AuditSubmissionAdminController {
  constructor(private readonly service: AuditSubmissionService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('status') status?: string,
  ) {
    return this.service.findAll(+page, +limit, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('reviewNote') reviewNote?: string,
  ) {
    return this.service.updateStatus(id, status, reviewNote);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
