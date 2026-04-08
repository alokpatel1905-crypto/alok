import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProgramsModule } from './programs/programs.module';
import { PagesModule } from './pages/pages.module';
import { UploadModule } from './upload/upload.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { AccreditationsModule } from './accreditations/accreditations.module';
import { RankingsModule } from './rankings/rankings.module';
import { EventsModule } from './events/events.module';
import { AwardsModule } from './awards/awards.module';
import { DocumentsModule } from './documents/documents.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PublicationsModule } from './publications/publications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CommunicationsModule } from './communications/communications.module';
import { SeoModule } from './seo/seo.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AdminModule,
    ProgramsModule,
    PagesModule,
    UploadModule,
    InstitutionsModule,
    AccreditationsModule,
    RankingsModule,
    EventsModule,
    AwardsModule,
    DocumentsModule,
    PaymentsModule,
    NotificationsModule,
    PublicationsModule,
    AnalyticsModule,
    CommunicationsModule,
    SeoModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}