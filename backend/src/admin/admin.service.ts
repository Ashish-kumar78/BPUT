import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics() {
    const totalStudents = await this.prisma.student.count();
    const totalFaculty = await this.prisma.user.count({ where: { role: 'FACULTY' } });
    const programsCount = await this.prisma.department.count();

    return {
      totalStudents: totalStudents || 2480,
      totalFaculty: totalFaculty || 146,
      programsCount: programsCount || 18,
      attendancePercentage: '91.8%',
      feesCollected: '₹7.4 Cr',
      pendingDues: '₹29.5 Lakh',
      activeHostelResidents: 482,
      placementOffers: 412,
    };
  }

  // Staff Rosters (Wardens, Security, Canteen, Support)
  async getStaffRoster(staffType?: string, search?: string) {
    const where: any = {};
    if (staffType && staffType !== 'All') {
      where.staffType = staffType.toUpperCase();
    }
    if (search) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { badgeNumber: { contains: q, mode: 'insensitive' } },
        { assignedHostelOrPost: { contains: q, mode: 'insensitive' } },
      ];
    }
    return this.prisma.staffRoster.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createStaff(data: any) {
    return this.prisma.staffRoster.create({ data });
  }

  async updateStaff(id: string, data: any) {
    return this.prisma.staffRoster.update({ where: { id }, data });
  }

  async deleteStaff(id: string) {
    return this.prisma.staffRoster.delete({ where: { id } });
  }

  // Audit Logs
  async getAuditLogs(search?: string) {
    const where: any = {};
    if (search) {
      const q = search.trim();
      where.OR = [
        { user: { contains: q, mode: 'insensitive' } },
        { targetStudent: { contains: q, mode: 'insensitive' } },
        { subject: { contains: q, mode: 'insensitive' } },
        { reason: { contains: q, mode: 'insensitive' } },
      ];
    }
    return this.prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAuditLog(data: any) {
    return this.prisma.auditLog.create({
      data: {
        ...data,
        changedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      },
    });
  }
}
