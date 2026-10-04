import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeesService } from './fees.service';

@ApiTags('Fees & Accounts')
@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Get('structures')
  @ApiOperation({ summary: 'Get official fee structures' })
  async getStructures() {
    const data = await this.feesService.getFeeStructures();
    return { success: true, count: data.length, data };
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get payment transactions with search filter' })
  async getTransactions(@Query('search') search?: string) {
    const data = await this.feesService.getTransactions(search);
    return { success: true, count: data.length, data };
  }

  @Post('record')
  @ApiOperation({ summary: 'Record counter payment and issue receipt' })
  async recordPayment(@Body() body: any) {
    const txn = await this.feesService.recordPayment(body);
    return {
      success: true,
      message: `Payment of ₹${Number(body.amount).toLocaleString('en-IN')} recorded for Roll ${body.rollNumber}! Receipt generated.`,
      data: txn,
    };
  }

  @Get('statement')
  @ApiOperation({ summary: 'Get student fee dues, paid receipts, and statement' })
  async getStatement(@Query('rollNumber') rollNumber?: string) {
    const data = await this.feesService.getStudentStatement(rollNumber || '01');
    return { success: true, data };
  }

  @Get('scholarships')
  @ApiOperation({ summary: 'Get available scholarship programs and beneficiaries' })
  async getScholarships() {
    const data = await this.feesService.getScholarships();
    return { success: true, count: data.length, data };
  }
}
