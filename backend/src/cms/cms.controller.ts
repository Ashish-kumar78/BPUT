import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CmsService } from './cms.service';

@ApiTags('Campus CMS & Community')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('notices')
  @ApiOperation({ summary: 'Get official campus circulars & notices' })
  async getNotices(@Query('search') search?: string, @Query('tag') tag?: string) {
    const data = await this.cmsService.getNotices(search, tag);
    return { success: true, count: data.length, data };
  }

  @Post('notices')
  @ApiOperation({ summary: 'Publish new circular or notice' })
  async createNotice(@Body() body: any) {
    const notice = await this.cmsService.createNotice(body);
    return { success: true, message: 'Notice published.', data: notice };
  }

  @Get('holidays')
  @ApiOperation({ summary: 'Get upcoming institutional holidays' })
  async getHolidays() {
    const data = await this.cmsService.getHolidays();
    return { success: true, count: data.length, data };
  }

  @Get('blogs')
  @ApiOperation({ summary: 'Get student and faculty community blog posts' })
  async getBlogs(@Query('tag') tag?: string) {
    const data = await this.cmsService.getBlogs(tag);
    return { success: true, count: data.length, data };
  }

  @Post('blogs')
  @ApiOperation({ summary: 'Create new community blog article' })
  async createBlog(@Body() body: any) {
    const post = await this.cmsService.createBlog(body);
    return { success: true, message: 'Blog published successfully!', data: post };
  }

  @Post('blogs/:id/like')
  @ApiOperation({ summary: 'Toggle like on a blog article' })
  async toggleLikeBlog(@Param('id') id: string) {
    const updated = await this.cmsService.toggleLikeBlog(id);
    return { success: true, data: updated };
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Submit course feedback, faculty appraisal, or infrastructure survey' })
  async submitFeedback(@Body() body: any) {
    const res = await this.cmsService.submitFeedback(body);
    return { success: true, message: 'Thank you! Your feedback has been recorded anonymously.', data: res };
  }

  @Get('biometric-logs')
  @ApiOperation({ summary: 'Get student turnstile biometric logs' })
  async getBiometricLogs(@Query('direction') direction?: string) {
    const data = await this.cmsService.getBiometricLogs(direction);
    return { success: true, count: data.length, data };
  }
}
