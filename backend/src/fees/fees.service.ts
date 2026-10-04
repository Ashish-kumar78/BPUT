import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeeStructures() {
    return this.prisma.feeStructure.findMany();
  }

  async getTransactions(search?: string) {
    const where: any = {};
    if (search) {
      const q = search.trim();
      where.OR = [
        { studentName: { contains: q, mode: 'insensitive' } },
        { rollNumber: { contains: q, mode: 'insensitive' } },
        { receiptNo: { contains: q, mode: 'insensitive' } },
      ];
    }
    return this.prisma.feeTransaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async recordPayment(data: {
    studentName: string;
    rollNumber: string;
    semester: string;
    head: string;
    amount: number;
    mode: string;
  }) {
    const receiptNo = `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return this.prisma.feeTransaction.create({
      data: {
        studentName: data.studentName,
        rollNumber: data.rollNumber,
        semester: data.semester,
        head: data.head,
        amount: Number(data.amount),
        mode: data.mode,
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Verified',
        receiptNo,
      },
    });
  }

  async getStudentStatement(rollNumber = '01') {
    const transactions = await this.prisma.feeTransaction.findMany({
      where: { rollNumber },
      orderBy: { createdAt: 'desc' },
    });

    const structures = await this.prisma.feeStructure.findMany();

    const totalAnnualDues = 98500;
    const paidAmount = transactions.reduce((acc, t) => acc + t.amount, 0);
    const outstanding = Math.max(0, totalAnnualDues - paidAmount);

    return {
      totalAnnualDues,
      paidAmount,
      outstanding,
      nextDueDate: '15 Nov 2026',
      transactions,
      structures,
    };
  }

  async getScholarships() {
    return this.prisma.scholarship.findMany();
  }
}
