import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AcademicsService } from './academics.service';

@ApiTags('Academics')
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Get('departments')
  @ApiOperation({ summary: 'Get all college departments' })
  async getDepartments() {
    const data = await this.academicsService.getDepartments();
    return { success: true, count: data.length, data };
  }

  @Post('departments')
  @ApiOperation({ summary: 'Create new department' })
  async createDepartment(@Body() body: any) {
    const dept = await this.academicsService.createDepartment(body);
    return { success: true, message: `Department ${dept.name} created.`, data: dept };
  }

  @Put('departments/:id')
  @ApiOperation({ summary: 'Update department' })
  async updateDepartment(@Param('id') id: string, @Body() body: any) {
    const dept = await this.academicsService.updateDepartment(id, body);
    return { success: true, message: `Department ${dept.name} updated.`, data: dept };
  }

  @Delete('departments/:id')
  @ApiOperation({ summary: 'Delete department' })
  async deleteDepartment(@Param('id') id: string) {
    await this.academicsService.deleteDepartment(id);
    return { success: true, message: 'Department deleted successfully.' };
  }

  @Get('semesters')
  @ApiOperation({ summary: 'Get all college semesters' })
  async getSemesters() {
    const data = await this.academicsService.getSemesters();
    return { success: true, count: data.length, data };
  }

  @Get('sections')
  @ApiOperation({ summary: 'Get active sections' })
  async getSections() {
    const data = await this.academicsService.getSections();
    return { success: true, count: data.length, data };
  }

  @Get('subjects')
  @ApiOperation({ summary: 'Get subjects with optional department and semester filters' })
  async getSubjects(@Query('department') department?: string, @Query('semester') semester?: string) {
    const data = await this.academicsService.getSubjects(department, semester);
    return { success: true, count: data.length, data };
  }

  @Post('subjects')
  @ApiOperation({ summary: 'Create subject' })
  async createSubject(@Body() body: any) {
    const sub = await this.academicsService.createSubject(body);
    return { success: true, message: `Subject ${sub.name} created.`, data: sub };
  }

  @Put('subjects/:id')
  @ApiOperation({ summary: 'Update subject' })
  async updateSubject(@Param('id') id: string, @Body() body: any) {
    const sub = await this.academicsService.updateSubject(id, body);
    return { success: true, message: `Subject ${sub.name} updated.`, data: sub };
  }

  @Delete('subjects/:id')
  @ApiOperation({ summary: 'Delete subject' })
  async deleteSubject(@Param('id') id: string) {
    await this.academicsService.deleteSubject(id);
    return { success: true, message: 'Subject deleted successfully.' };
  }

  @Get('timetable')
  @ApiOperation({ summary: 'Get weekly academic timetable schedule' })
  getTimetable() {
    return { success: true, data: this.academicsService.getWeeklyTimetable() };
  }
}
