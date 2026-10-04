import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostelService {
  constructor(private readonly prisma: PrismaService) {}

  async getHostels() {
    return this.prisma.hostel.findMany();
  }

  async getMyResidence(rollNumber = '01') {
    const student = await this.prisma.student.findFirst({
      where: { rollNumber },
    });

    return {
      hostelName: student?.hostelName || 'Sarojini Girls Residence (Block A)',
      roomNumber: student?.roomNumber || '204',
      bedNumber: student?.bedNumber || 'Bed 01 (Window Side)',
      floor: student?.floor || 'Floor 2',
      wardenName: student?.wardenName || 'Mrs. Nibedita Das',
      wardenContact: student?.wardenContact || '+91 94370 33445',
      roommates: [
        { name: 'Priya Patra', roll: '04', branch: 'CSE - Sem 5', bed: 'Bed 02' },
        { name: 'Sneha Mohanty', roll: '06', branch: 'CSE - Sem 5', bed: 'Bed 03' },
      ],
      rules: [
        'Night curfews strictly implemented at 8:30 PM.',
        'Biometric attendance check-in compulsory before 8:45 PM.',
        'Mess timings: Breakfast 7:30 - 9:00 AM, Dinner 7:30 - 9:30 PM.',
        'Electric heating appliances and immersion rods strictly prohibited.',
      ],
    };
  }

  async getComplaints(rollNumber?: string) {
    const where: any = {};
    if (rollNumber) where.rollNumber = rollNumber;
    return this.prisma.hostelComplaint.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async lodgeComplaint(data: {
    studentName?: string;
    rollNumber?: string;
    hostel?: string;
    roomNumber?: string;
    category: string;
    title: string;
    priority?: string;
  }) {
    return this.prisma.hostelComplaint.create({
      data: {
        studentName: data.studentName || 'Rakesh Das',
        rollNumber: data.rollNumber || '01',
        hostel: data.hostel || 'Sarojini Girls Residence',
        roomNumber: data.roomNumber || '204',
        category: data.category,
        title: data.title,
        priority: data.priority || 'Medium',
        status: 'Pending',
        filedDate: 'Today, Just now',
        resolutionNotes: 'Assigned to resident warden for contractor scheduling.',
      },
    });
  }

  async updateComplaintStatus(id: string, status: string) {
    return this.prisma.hostelComplaint.update({
      where: { id },
      data: {
        status,
        resolutionNotes: status === 'Resolved' ? 'Verified by hostel maintenance supervisor.' : undefined,
      },
    });
  }

  async getVisitors() {
    return this.prisma.hostelVisitor.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async issueVisitorPass(data: {
    visitorName: string;
    relation: string;
    studentName: string;
    rollNumber: string;
    inTime: string;
    purpose: string;
  }) {
    const passNumber = `PASS-${Math.floor(800 + Math.random() * 200)}`;
    return this.prisma.hostelVisitor.create({
      data: {
        ...data,
        outTime: 'Pending Sign-out',
        passNumber,
      },
    });
  }
}
