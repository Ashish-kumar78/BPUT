import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students with optional filters for admin and faculty rosters' })
  async getAllStudents(
    @Query('search') search?: string,
    @Query('department') department?: string,
    @Query('semester') semester?: string,
    @Query('section') section?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.studentsService.getAllStudents({ search, department, semester, section, status });
    return { success: true, count: data.length, data };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged-in student full profile' })
  async getProfile(@CurrentUser() user: any) {
    const student = await this.studentsService.getProfile(user.id || user.identifier || '01');
    return { success: true, data: student };
  }

  @Post('transfer-preference')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save temporary campus preference declaration from student dashboard' })
  async saveTransfer(
    @CurrentUser() user: any,
    @Body() body: { campus: string; city: string; confirmed: boolean },
  ) {
    const student = await this.studentsService.saveTransferPreference(
      user.student?.id || user.identifier || '01',
      body.campus,
      body.city,
    );
    return { success: true, message: `Preference saved: ${body.campus}, ${body.city}.`, data: student };
  }

  @Post()
  @ApiOperation({ summary: 'Create new student (Admin portal)' })
  async createStudent(@Body() body: any) {
    const student = await this.studentsService.createStudent(body);
    return { success: true, message: `Student ${student.name} created successfully!`, data: student };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student by ID' })
  async updateStudent(@Param('id') id: string, @Body() body: any) {
    const updated = await this.studentsService.updateStudent(id, body);
    return { success: true, message: `Student ${updated.name} updated.`, data: updated };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student by ID' })
  async deleteStudent(@Param('id') id: string) {
    await this.studentsService.deleteStudent(id);
    return { success: true, message: 'Student deleted successfully.' };
  }
}
