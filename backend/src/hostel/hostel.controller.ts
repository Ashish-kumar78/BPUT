import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HostelService } from './hostel.service';

@ApiTags('Hostel Management')
@Controller('hostel')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get all college hostels and room capacities' })
  async getHostels() {
    const data = await this.hostelService.getHostels();
    return { success: true, count: data.length, data };
  }

  @Get('my-residence')
  @ApiOperation({ summary: 'Get current student hostel room details and roommates' })
  async getMyResidence(@Query('rollNumber') rollNumber?: string) {
    const data = await this.hostelService.getMyResidence(rollNumber || '01');
    return { success: true, data };
  }

  @Get('complaints')
  @ApiOperation({ summary: 'Get hostel maintenance complaints' })
  async getComplaints(@Query('rollNumber') rollNumber?: string) {
    const data = await this.hostelService.getComplaints(rollNumber);
    return { success: true, count: data.length, data };
  }

  @Post('complaints')
  @ApiOperation({ summary: 'Lodge new hostel maintenance complaint' })
  async lodgeComplaint(@Body() body: any) {
    const ticket = await this.hostelService.lodgeComplaint(body);
    return { success: true, message: 'Hostel maintenance ticket lodged successfully! The warden has been notified.', data: ticket };
  }

  @Patch('complaints/:id/status')
  @ApiOperation({ summary: 'Update complaint status (Pending, In Progress, Resolved)' })
  async updateComplaintStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const updated = await this.hostelService.updateComplaintStatus(id, body.status);
    return { success: true, message: `Complaint ${id} status updated to ${body.status}`, data: updated };
  }

  @Get('visitors')
  @ApiOperation({ summary: 'Get hostel visitor logs' })
  async getVisitors() {
    const data = await this.hostelService.getVisitors();
    return { success: true, count: data.length, data };
  }

  @Post('visitors')
  @ApiOperation({ summary: 'Issue digital visitor entry pass' })
  async issueVisitorPass(@Body() body: any) {
    const pass = await this.hostelService.issueVisitorPass(body);
    return { success: true, message: `Visitor pass issued for ${pass.visitorName}!`, data: pass };
  }
}
