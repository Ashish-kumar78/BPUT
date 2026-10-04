import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Campus Administration')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get institutional dashboard KPI overview metrics' })
  async getMetrics() {
    const data = await this.adminService.getMetrics();
    return { success: true, data };
  }

  @Get('staff')
  @ApiOperation({ summary: 'Get staff rosters (WARDEN, SECURITY, CANTEEN, SUPPORT)' })
  async getStaff(
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.adminService.getStaffRoster(type, search);
    return { success: true, count: data.length, data };
  }

  @Post('staff')
  @ApiOperation({ summary: 'Add staff member to duty roster' })
  async createStaff(@Body() body: any) {
    const staff = await this.adminService.createStaff(body);
    return { success: true, message: `Staff member ${staff.name} added to roster!`, data: staff };
  }

  @Put('staff/:id')
  @ApiOperation({ summary: 'Update staff member' })
  async updateStaff(@Param('id') id: string, @Body() body: any) {
    const staff = await this.adminService.updateStaff(id, body);
    return { success: true, message: `Staff member ${staff.name} updated.`, data: staff };
  }

  @Delete('staff/:id')
  @ApiOperation({ summary: 'Remove staff member from roster' })
  async deleteStaff(@Param('id') id: string) {
    await this.adminService.deleteStaff(id);
    return { success: true, message: 'Staff member removed from roster.' };
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get system audit trail logs' })
  async getAuditLogs(@Query('search') search?: string) {
    const data = await this.adminService.getAuditLogs(search);
    return { success: true, count: data.length, data };
  }

  @Post('audit-logs')
  @ApiOperation({ summary: 'Create new audit trail log' })
  async createAuditLog(@Body() body: any) {
    const log = await this.adminService.createAuditLog(body);
    return { success: true, data: log };
  }
}
