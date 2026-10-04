import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MarksService } from './marks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Marks Management')
@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Get('student')
  @ApiOperation({ summary: 'Get current student marks across all subjects' })
  async getStudentMarks(@Query('rollNumber') rollNumber?: string) {
    const data = await this.marksService.getStudentMarks(rollNumber || '01');
    return { success: true, count: data.length, data };
  }

  @Get('section/:subjectCode')
  @ApiOperation({ summary: 'Get full marksheet for a subject and section (91 students)' })
  async getSectionMarks(
    @Param('subjectCode') subjectCode: string,
    @Query('section') section?: string,
  ) {
    const data = await this.marksService.getSectionMarks(subjectCode, section || 'Section A');
    return { success: true, count: data.length, data };
  }

  @Put('cell')
  @ApiOperation({ summary: 'Update an individual student assessment cell mark' })
  async updateCell(
    @Body() body: {
      studentId?: string;
      rollNumber?: string;
      subjectCode: string;
      assessment: string;
      score: number;
      reason?: string;
      user?: string;
      role?: string;
    },
  ) {
    const updated = await this.marksService.updateCellMark(body);
    return { success: true, message: 'Mark updated and recalculated.', data: updated };
  }

  @Get('approval-queue')
  @ApiOperation({ summary: 'Get HOD moderation approval queue' })
  async getApprovalQueue() {
    const data = await this.marksService.getApprovalQueue();
    return { success: true, count: data.length, data };
  }

  @Post('submit-to-hod')
  @ApiOperation({ summary: 'Faculty submits continuous marks to HOD for moderation' })
  async submitToHod(@Body() body: any) {
    const item = await this.marksService.submitToHod(body);
    return { success: true, message: 'Marks submitted to HOD moderation queue.', data: item };
  }

  @Post('hod/approve')
  @ApiOperation({ summary: 'HOD approves continuous internal assessment marks' })
  async approve(@Body() body: { id: string }) {
    const approved = await this.marksService.approveQueueItem(body.id);
    return { success: true, message: `Marks for ${approved.subject} officially APPROVED and published!`, data: approved };
  }

  @Post('hod/reject')
  @ApiOperation({ summary: 'HOD rejects continuous marks with mandatory feedback note' })
  async reject(@Body() body: { id: string; rejectionReason: string }) {
    const rejected = await this.marksService.rejectQueueItem(body.id, body.rejectionReason);
    return { success: true, message: `Marks for ${rejected.subject} returned to faculty for revision.`, data: rejected };
  }

  @Post('hod/unlock')
  @ApiOperation({ summary: 'HOD unlocks marks for faculty correction' })
  async unlock(@Body() body: { id: string }) {
    const unlocked = await this.marksService.unlockQueueItem(body.id);
    return { success: true, message: `Marks for ${unlocked.subject} unlocked for editing.`, data: unlocked };
  }

  @Get('scheme')
  @ApiOperation({ summary: 'Get autonomous continuous evaluation marking scheme' })
  async getMarkingScheme() {
    const data = await this.marksService.getMarkingSchemes();
    return { success: true, count: data.length, data };
  }

  @Put('scheme/:id')
  @ApiOperation({ summary: 'Update autonomous marking scheme (Admin council)' })
  async updateMarkingScheme(@Param('id') id: string, @Body() body: any) {
    const updated = await this.marksService.updateMarkingScheme(id, body);
    return { success: true, message: 'Marking scheme updated.', data: updated };
  }
}
