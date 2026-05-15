import { Module } from '@nestjs/common';
import { AuditSubmissionService } from './audit-submission.service';
import { AuditSubmitController, AuditSubmissionAdminController } from './audit-submission.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditSubmitController, AuditSubmissionAdminController],
  providers: [AuditSubmissionService],
})
export class AuditSubmissionModule {}
