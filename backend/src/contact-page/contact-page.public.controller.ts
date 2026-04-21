import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactPageService } from './contact-page.service';

/**
 * Public API endpoints for the Contact page.
 * These are accessed by the frontend without authentication.
 */
@Controller('api')
export class ContactPagePublicController {
  constructor(private readonly contactPageService: ContactPageService) {}

  @Get('contact-page')
  async getContactPage() {
    // Returns the full configuration for the Contact page.
    return this.contactPageService.getPageConfig();
  }

  @Post('contact-submit')
  async submitContact(@Body() payload: any) {
    // Payload should contain the fields from the contact form.
    return this.contactPageService.submitContactForm(payload);
  }
}
