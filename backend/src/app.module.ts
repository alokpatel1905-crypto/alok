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
import { SectionsModule } from './sections/sections.module';
import { AboutPageModule } from './about-page/about-page.module';
import { MilestonesModule } from './milestones/milestones.module';
import { ImpactModule } from './impact/impact.module';
import { AccreditationModule } from './accreditation/accreditation.module';
import { EventsPageModule } from './events-page/events.module';
import { AwardsPageModule } from './awards-page/awards-page.module';
import { NetworksPageModule } from './networks-page/networks-page.module';
import { SupportPageModule } from './support-page/support-page.module';
import { ContactPageModule } from './contact-page/contact-page.module';
import { MediaPageModule } from './media-page/media-page.module';
import { HomePageModule } from './home-page/home-page.module';

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
    SectionsModule,
    AboutPageModule,
    MilestonesModule,
    ImpactModule,
    AccreditationModule,
    EventsPageModule,
    AwardsPageModule,
    NetworksPageModule,
    SupportPageModule,
    ContactPageModule,
    MediaPageModule,
    HomePageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}