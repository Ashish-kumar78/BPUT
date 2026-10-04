import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademicsService {
  constructor(private readonly prisma: PrismaService) {}

  // Departments
  async getDepartments() {
    return this.prisma.department.findMany({ orderBy: { code: 'asc' } });
  }

  async createDepartment(data: any) {
    return this.prisma.department.create({ data });
  }

  async updateDepartment(id: string, data: any) {
    return this.prisma.department.update({ where: { id }, data });
  }

  async deleteDepartment(id: string) {
    return this.prisma.department.delete({ where: { id } });
  }

  // Semesters
  async getSemesters() {
    return this.prisma.semester.findMany({ orderBy: { number: 'asc' } });
  }

  // Sections
  async getSections() {
    return this.prisma.section.findMany({ orderBy: { semester: 'asc' } });
  }

  // Subjects
  async getSubjects(department?: string, semester?: string) {
    const where: any = {};
    if (department && department !== 'All') where.department = department;
    if (semester && semester !== 'All') where.semester = semester;
    return this.prisma.subject.findMany({ where, orderBy: { code: 'asc' } });
  }

  async createSubject(data: any) {
    return this.prisma.subject.create({ data });
  }

  async updateSubject(id: string, data: any) {
    return this.prisma.subject.update({ where: { id }, data });
  }

  async deleteSubject(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }

  // Timetable
  getWeeklyTimetable() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      slots: ['8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM'],
      schedule: {
        Monday: {
          '8:30 AM': { subject: 'Artificial Intelligence', code: 'CS501', room: 'Room 301', faculty: 'Dr. P. Mohapatra', type: 'theory' },
          '9:30 AM': { subject: 'Machine Learning', code: 'CS502', room: 'Room 302', faculty: 'Dr. S. Rath', type: 'theory' },
          '11:30 AM': { subject: 'Compiler Design', code: 'CS504', room: 'Room 204', faculty: 'Dr. A. Panda', type: 'theory' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
          '1:30 PM': { subject: 'AI Lab', code: 'CS505', room: 'CS Lab-1', faculty: 'Dr. P. Mohapatra', type: 'lab' },
          '2:30 PM': { subject: 'AI Lab', code: 'CS505', room: 'CS Lab-1', faculty: 'Dr. P. Mohapatra', type: 'lab' },
        },
        Tuesday: {
          '8:30 AM': { subject: 'Cloud Computing', code: 'CS503', room: 'Room 205', faculty: 'Prof. R. Nayak', type: 'theory' },
          '9:30 AM': { subject: 'Artificial Intelligence', code: 'CS501', room: 'Room 301', faculty: 'Dr. P. Mohapatra', type: 'theory' },
          '10:30 AM': { subject: 'Machine Learning', code: 'CS502', room: 'Room 302', faculty: 'Dr. S. Rath', type: 'theory' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
          '1:30 PM': { subject: 'Project Work', code: 'CS506', room: 'Lab-3', faculty: 'Dr. S. Mohanty', type: 'project' },
          '2:30 PM': { subject: 'Project Work', code: 'CS506', room: 'Lab-3', faculty: 'Dr. S. Mohanty', type: 'project' },
        },
        Wednesday: {
          '8:30 AM': { subject: 'Compiler Design', code: 'CS504', room: 'Room 204', faculty: 'Dr. A. Panda', type: 'theory' },
          '10:30 AM': { subject: 'Cloud Computing', code: 'CS503', room: 'Room 205', faculty: 'Prof. R. Nayak', type: 'theory' },
          '11:30 AM': { subject: 'Machine Learning', code: 'CS502', room: 'Room 302', faculty: 'Dr. S. Rath', type: 'theory' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
        },
        Thursday: {
          '8:30 AM': { subject: 'Artificial Intelligence', code: 'CS501', room: 'Room 301', faculty: 'Dr. P. Mohapatra', type: 'theory' },
          '9:30 AM': { subject: 'Compiler Design', code: 'CS504', room: 'Room 204', faculty: 'Dr. A. Panda', type: 'theory' },
          '11:30 AM': { subject: 'Cloud Computing', code: 'CS503', room: 'Room 205', faculty: 'Prof. R. Nayak', type: 'theory' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
          '1:30 PM': { subject: 'AI Lab', code: 'CS505', room: 'CS Lab-1', faculty: 'Dr. P. Mohapatra', type: 'lab' },
          '2:30 PM': { subject: 'AI Lab', code: 'CS505', room: 'CS Lab-1', faculty: 'Dr. P. Mohapatra', type: 'lab' },
        },
        Friday: {
          '8:30 AM': { subject: 'Machine Learning', code: 'CS502', room: 'Room 302', faculty: 'Dr. S. Rath', type: 'theory' },
          '9:30 AM': { subject: 'Cloud Computing', code: 'CS503', room: 'Room 205', faculty: 'Prof. R. Nayak', type: 'theory' },
          '10:30 AM': { subject: 'Artificial Intelligence', code: 'CS501', room: 'Room 301', faculty: 'Dr. P. Mohapatra', type: 'theory' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
        },
        Saturday: {
          '8:30 AM': { subject: 'GATE / Mentorship Sessions', code: 'GATE', room: 'Seminar Hall-2', faculty: 'Senior Faculty', type: 'mentor' },
          '10:30 AM': { subject: 'Technical Seminars', code: 'SEM', room: 'Auditorium', faculty: 'Visiting Experts', type: 'seminar' },
          '12:30 PM': { subject: 'Lunch Break', code: '', room: '', faculty: '', type: 'break' },
        },
      },
    };
  }
}
