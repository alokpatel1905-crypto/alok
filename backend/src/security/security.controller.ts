import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('security')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('audit-logs')
  getAuditLogs(@Query('page') page: string = '1', @Query('limit') limit: string = '20') {
    return this.securityService.getAuditLogs(+page, +limit);
  }

  @Get('login-history')
  getLoginHistory(@Query('page') page: string = '1', @Query('limit') limit: string = '20') {
    return this.securityService.getLoginHistory(+page, +limit);
  }

  @Get('alerts')
  getAlerts() {
    return this.securityService.getSecurityAlerts();
  }
}
