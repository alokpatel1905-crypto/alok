"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const programs_module_1 = require("./programs/programs.module");
const pages_module_1 = require("./pages/pages.module");
const upload_module_1 = require("./upload/upload.module");
const institutions_module_1 = require("./institutions/institutions.module");
const accreditations_module_1 = require("./accreditations/accreditations.module");
const rankings_module_1 = require("./rankings/rankings.module");
const events_module_1 = require("./events/events.module");
const awards_module_1 = require("./awards/awards.module");
const documents_module_1 = require("./documents/documents.module");
const payments_module_1 = require("./payments/payments.module");
const notifications_module_1 = require("./notifications/notifications.module");
const publications_module_1 = require("./publications/publications.module");
const analytics_module_1 = require("./analytics/analytics.module");
const communications_module_1 = require("./communications/communications.module");
const seo_module_1 = require("./seo/seo.module");
const security_module_1 = require("./security/security.module");
const sections_module_1 = require("./sections/sections.module");
const about_page_module_1 = require("./about-page/about-page.module");
const milestones_module_1 = require("./milestones/milestones.module");
const impact_module_1 = require("./impact/impact.module");
const accreditation_module_1 = require("./accreditation/accreditation.module");
const events_module_2 = require("./events-page/events.module");
const awards_page_module_1 = require("./awards-page/awards-page.module");
const networks_page_module_1 = require("./networks-page/networks-page.module");
const support_page_module_1 = require("./support-page/support-page.module");
const contact_page_module_1 = require("./contact-page/contact-page.module");
const media_page_module_1 = require("./media-page/media-page.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            programs_module_1.ProgramsModule,
            pages_module_1.PagesModule,
            upload_module_1.UploadModule,
            institutions_module_1.InstitutionsModule,
            accreditations_module_1.AccreditationsModule,
            rankings_module_1.RankingsModule,
            events_module_1.EventsModule,
            awards_module_1.AwardsModule,
            documents_module_1.DocumentsModule,
            payments_module_1.PaymentsModule,
            notifications_module_1.NotificationsModule,
            publications_module_1.PublicationsModule,
            analytics_module_1.AnalyticsModule,
            communications_module_1.CommunicationsModule,
            seo_module_1.SeoModule,
            security_module_1.SecurityModule,
            sections_module_1.SectionsModule,
            about_page_module_1.AboutPageModule,
            milestones_module_1.MilestonesModule,
            impact_module_1.ImpactModule,
            accreditation_module_1.AccreditationModule,
            events_module_2.EventsPageModule,
            awards_page_module_1.AwardsPageModule,
            networks_page_module_1.NetworksPageModule,
            support_page_module_1.SupportPageModule,
            contact_page_module_1.ContactPageModule,
            media_page_module_1.MediaPageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map